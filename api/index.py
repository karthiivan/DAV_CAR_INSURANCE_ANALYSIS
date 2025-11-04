from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import json
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Get the base path
BASE_PATH = Path(__file__).parent.parent

# Load ML model and preprocessing artifacts
print("🚀 Loading ML model and artifacts...")
try:
    model = joblib.load(str(BASE_PATH / 'backend' / 'models' / 'premium_predictor.pkl'))
    scaler = joblib.load(str(BASE_PATH / 'backend' / 'models' / 'scaler.pkl'))
    encoders = joblib.load(str(BASE_PATH / 'backend' / 'models' / 'encoders.pkl'))
    feature_names = joblib.load(str(BASE_PATH / 'backend' / 'models' / 'feature_names.pkl'))
    df = pd.read_csv(str(BASE_PATH / 'backend' / 'data' / 'insurance_processed.csv'))
    print("✅ Backend ready!")
except Exception as e:
    print(f"⚠️ Warning loading artifacts: {e}")
    model = None
    scaler = None
    encoders = None
    feature_names = None
    df = None

def prepare_features(user_data):
    """Prepare user input for model prediction"""
    
    # Create feature dictionary
    features = {}
    
    # Numerical features
    features['age'] = user_data['age']
    features['bmi'] = user_data.get('bmi', 25.0)  # Default BMI
    features['children'] = user_data.get('children', 0)
    features['annual_mileage'] = user_data['annual_mileage']
    features['vehicle_age'] = 2025 - user_data['vehicle_year']
    
    # Encode categorical features
    features['sex_encoded'] = encoders['sex'].transform([user_data['sex']])[0]
    features['smoker_encoded'] = encoders['smoker'].transform([user_data['smoker']])[0]
    features['region_encoded'] = encoders['region'].transform([user_data.get('region', 'northeast')])[0]
    features['vehicle_make_encoded'] = encoders['vehicle_make'].transform([user_data['vehicle_make']])[0]
    features['usage_type_encoded'] = encoders['usage_type'].transform([user_data['usage_type']])[0]
    features['fuel_type_encoded'] = encoders['fuel_type'].transform([user_data['fuel_type']])[0]
    
    # Create age group for comparison
    if features['age'] < 25:
        age_group = '18-24'
    elif features['age'] < 35:
        age_group = '25-34'
    elif features['age'] < 45:
        age_group = '35-44'
    elif features['age'] < 55:
        age_group = '45-54'
    else:
        age_group = '55+'
    
    # Create vehicle category
    vehicle_age = features['vehicle_age']
    if vehicle_age < 3:
        vehicle_category = 'New'
    elif vehicle_age < 7:
        vehicle_category = 'Mid-age'
    else:
        vehicle_category = 'Old'
    
    # Scale the features
    feature_values = [features[name] for name in feature_names]
    scaled_features = scaler.transform([feature_values])
    
    return scaled_features, age_group, vehicle_category

@app.route('/api/get-quote', methods=['POST'])
def get_quote():
    """Get insurance quote based on user details"""
    
    try:
        user_data = request.json
        print(f"📥 Received quote request: {user_data}")
        
        # Validate required fields
        required_fields = ['age', 'sex', 'smoker', 'vehicle_make', 'vehicle_year', 
                          'annual_mileage', 'usage_type', 'fuel_type']
        for field in required_fields:
            if field not in user_data:
                print(f"❌ Missing field: {field}")
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Prepare features
        scaled_features, age_group, vehicle_category = prepare_features(user_data)
        
        # Predict premium
        monthly_premium = model.predict(scaled_features)[0]
        yearly_premium = monthly_premium * 12 * 0.9  # 10% annual discount
        
        # Calculate breakdown (simplified)
        base_premium = monthly_premium * 0.60
        vehicle_premium = monthly_premium * 0.25
        addon_premium = monthly_premium * 0.10
        tax_premium = monthly_premium * 0.05
        
        # Find similar profiles
        similar_mask = (
            (df['vehicle_make'] == user_data['vehicle_make']) &
            (df['age_group'] == age_group)
        )
        similar_premiums = df[similar_mask]['monthly_premium']
        
        if len(similar_premiums) > 0:
            similar_avg = similar_premiums.mean()
            similar_min = similar_premiums.min()
            similar_max = similar_premiums.max()
        else:
            similar_avg = monthly_premium
            similar_min = monthly_premium * 0.9
            similar_max = monthly_premium * 1.1
        
        # Calculate percentile
        all_premiums = df['monthly_premium'].values
        percentile = (all_premiums < monthly_premium).sum() / len(all_premiums) * 100
        
        # Price factors
        factors = []
        
        # Age factor
        avg_by_age = df[df['age_group'] == age_group]['monthly_premium'].mean()
        overall_avg = df['monthly_premium'].mean()
        age_impact = avg_by_age - overall_avg
        if abs(age_impact) > 50:
            factors.append({
                "factor": f"Your age ({user_data['age']})",
                "impact": f"{'Adds' if age_impact > 0 else 'Saves'} ₹{abs(age_impact):.0f}/month",
                "type": "negative" if age_impact > 0 else "positive"
            })
        
        # Vehicle factor
        avg_by_vehicle = df[df['vehicle_make'] == user_data['vehicle_make']]['monthly_premium'].mean()
        vehicle_impact = avg_by_vehicle - overall_avg
        if abs(vehicle_impact) > 50:
            factors.append({
                "factor": f"Vehicle ({user_data['vehicle_make']})",
                "impact": f"{'Adds' if vehicle_impact > 0 else 'Saves'} ₹{abs(vehicle_impact):.0f}/month",
                "type": "negative" if vehicle_impact > 0 else "positive"
            })
        
        # Smoking factor
        if user_data['smoker'] == 'yes':
            smoker_impact = df[df['smoker'] == 'yes']['monthly_premium'].mean() - df[df['smoker'] == 'no']['monthly_premium'].mean()
            factors.append({
                "factor": "Smoker",
                "impact": f"Adds ₹{smoker_impact:.0f}/month",
                "type": "negative"
            })
        else:
            nonsmoker_impact = df[df['smoker'] == 'no']['monthly_premium'].mean() - df[df['smoker'] == 'yes']['monthly_premium'].mean()
            factors.append({
                "factor": "Non-smoker",
                "impact": f"Saves ₹{abs(nonsmoker_impact):.0f}/month",
                "type": "positive"
            })
        
        # Mileage factor
        if user_data['annual_mileage'] > 20000:
            high_mileage_avg = df[df['annual_mileage'] > 20000]['monthly_premium'].mean()
            low_mileage_avg = df[df['annual_mileage'] <= 20000]['monthly_premium'].mean()
            mileage_impact = high_mileage_avg - low_mileage_avg
            factors.append({
                "factor": "High mileage",
                "impact": f"Adds ₹{mileage_impact:.0f}/month",
                "type": "negative"
            })
        
        # Build response
        response = {
            "monthlyPremium": round(monthly_premium, 2),
            "yearlyPremium": round(yearly_premium, 2),
            "breakdown": {
                "base": round(base_premium, 2),
                "vehicle": round(vehicle_premium, 2),
                "addons": round(addon_premium, 2),
                "taxes": round(tax_premium, 2)
            },
            "factors": factors,
            "comparison": {
                "message": f"You're paying {'LESS' if monthly_premium < similar_avg else 'MORE'} than {abs(percentile - 50):.0f}% of similar drivers!",
                "percentile": round(percentile, 1),
                "similarProfiles": {
                    "average": round(similar_avg, 2),
                    "range": f"₹{similar_min:.0f}-₹{similar_max:.0f}/month"
                }
            },
            "features": {
                "liability": "Up to ₹15 Lakh",
                "collision": "Included",
                "roadside": "24/7 Assistance",
                "cashless": "5000+ garages",
                "accident": "Personal Accident Cover"
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        print(f"❌ Error in get_quote: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/api/insights', methods=['GET'])
def get_insights():
    """Get all insurance insights"""
    
    try:
        insights = {}
        
        insight_files = [
            'brand_comparison',
            'age_vs_premium',
            'smoking_impact',
            'mileage_impact',
            'vehicle_age_impact',
            'gender_comparison',
            'region_comparison',
            'fuel_type_comparison',
            'usage_type_comparison',
            'savings_calculator',
            'most_popular',
            'premium_distribution'
        ]
        
        for file in insight_files:
            try:
                with open(str(BASE_PATH / 'backend' / 'visualization_data' / f'{file}.json')) as f:
                    insights[file] = json.load(f)
            except:
                insights[file] = {"error": f"Could not load {file}"}
        
        return jsonify(insights)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/compare-brands', methods=['GET'])
def compare_brands():
    """Compare insurance premiums by brand"""
    
    try:
        if df is None:
            return jsonify({"error": "Data not loaded"}), 500
        
        brand_comparison = df.groupby('vehicle_make')['monthly_premium'].agg(['mean', 'min', 'max', 'count']).round(2).to_dict()
        
        return jsonify(brand_comparison)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/savings-tips', methods=['POST'])
def get_savings_tips():
    """Get personalized savings tips"""
    
    try:
        user_data = request.json
        tips = []
        
        # Age-based tips
        if user_data.get('age', 30) < 25:
            savings = df[df['age_group'] == '18-24']['monthly_premium'].mean() * 0.15
            tips.append({
                "title": "Young Driver Discount",
                "description": "Consider defensive driving courses to unlock discounts",
                "savings": f"₹{savings:.0f}/month"
            })
        
        # Non-smoker tips
        if user_data.get('smoker') == 'no':
            savings = (df[df['smoker'] == 'yes']['monthly_premium'].mean() - 
                      df[df['smoker'] == 'no']['monthly_premium'].mean())
            tips.append({
                "title": "Non-Smoker Benefit",
                "description": "Your non-smoking status qualifies you for special discounts",
                "savings": f"₹{savings:.0f}/month"
            })
        
        # Low mileage tips
        if user_data.get('annual_mileage', 20000) < 10000:
            savings = (df[df['annual_mileage'] > 20000]['monthly_premium'].mean() - 
                      df[df['annual_mileage'] <= 10000]['monthly_premium'].mean())
            tips.append({
                "title": "Low Mileage Discount",
                "description": "Your low annual mileage reduces accident risk significantly",
                "savings": f"₹{savings:.0f}/month"
            })
        
        # New vehicle tips
        if user_data.get('vehicle_year', 2020) >= 2023:
            savings = (df[df['vehicle_age'] > 5]['monthly_premium'].mean() - 
                      df[df['vehicle_age'] <= 2]['monthly_premium'].mean()) * 0.5
            tips.append({
                "title": "New Vehicle Discount",
                "description": "Newer vehicles have advanced safety features",
                "savings": f"₹{savings:.0f}/month"
            })
        
        # Personal accident cover
        savings = 250
        tips.append({
            "title": "Personal Accident Cover",
            "description": "Add personal accident protection for family members",
            "savings": f"₹{savings:.0f}/month"
        })
        
        return jsonify({"tips": tips, "totalPotentialSavings": sum([float(tip['savings'].replace('₹', '').replace('/month', '')) for tip in tips]) if tips else 0})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "message": "Backend is running"}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
