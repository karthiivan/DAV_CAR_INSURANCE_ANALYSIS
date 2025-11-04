import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
import os

def preprocess_data():
    """Load and preprocess insurance data for ML"""
    
    print("📂 Loading dataset...")
    df = pd.read_csv('data/insurance.csv')
    
    print(f"✓ Loaded {len(df)} records")
    print(f"\n📊 Dataset Info:")
    print(f"   Shape: {df.shape}")
    print(f"   Columns: {list(df.columns)}")
    
    # Basic statistics
    print(f"\n📈 Basic Statistics:")
    print(f"   Mean Age: {df['age'].mean():.1f} years")
    print(f"   Mean BMI: {df['bmi'].mean():.1f}")
    print(f"   Smokers: {(df['smoker'] == 'yes').sum()} ({(df['smoker'] == 'yes').sum()/len(df)*100:.1f}%)")
    print(f"   Average Monthly Premium: ₹{df['monthly_premium'].mean():.2f}")
    print(f"   Premium Range: ₹{df['monthly_premium'].min():.2f} - ₹{df['monthly_premium'].max():.2f}")
    
    # Handle missing values
    print(f"\n🔍 Checking for missing values...")
    missing = df.isnull().sum()
    if missing.sum() > 0:
        print(f"   Found {missing.sum()} missing values")
        # Impute numerical with median
        for col in df.select_dtypes(include=[np.number]).columns:
            if df[col].isnull().sum() > 0:
                df[col].fillna(df[col].median(), inplace=True)
        # Impute categorical with mode
        for col in df.select_dtypes(include=['object']).columns:
            if df[col].isnull().sum() > 0:
                df[col].fillna(df[col].mode()[0], inplace=True)
        print("   ✓ Missing values handled")
    else:
        print("   ✓ No missing values found")
    
    # Feature Engineering
    print(f"\n🔧 Feature Engineering...")
    
    # Age groups
    def categorize_age(age):
        if age <= 25:
            return 'Young (18-25)'
        elif age <= 40:
            return 'Adult (26-40)'
        elif age <= 55:
            return 'Middle (41-55)'
        else:
            return 'Senior (56+)'
    
    df['age_group'] = df['age'].apply(categorize_age)
    
    # Vehicle category
    def categorize_vehicle(make):
        economy = ['Maruti', 'Tata']
        luxury = ['BMW', 'Mercedes', 'Audi']
        if make in economy:
            return 'Economy'
        elif make in luxury:
            return 'Luxury'
        else:
            return 'Mid-range'
    
    df['vehicle_category'] = df['vehicle_make'].apply(categorize_vehicle)
    
    # High mileage flag
    df['high_mileage'] = (df['annual_mileage'] > 20000).astype(int)
    
    # Old vehicle flag
    df['old_vehicle'] = (df['vehicle_age'] > 7).astype(int)
    
    print(f"   ✓ Created age_group, vehicle_category, high_mileage, old_vehicle")
    
    # Prepare features for ML
    print(f"\n🎯 Preparing features for ML...")
    
    # Create copy for encoding
    df_encoded = df.copy()
    
    # Encode categorical variables
    encoders = {}
    categorical_cols = ['sex', 'smoker', 'region', 'vehicle_make', 'usage_type', 
                       'fuel_type', 'age_group', 'vehicle_category']
    
    for col in categorical_cols:
        le = LabelEncoder()
        df_encoded[col + '_encoded'] = le.fit_transform(df_encoded[col])
        encoders[col] = le
    
    print(f"   ✓ Encoded {len(categorical_cols)} categorical features")
    
    # Select features for training
    feature_cols = [
        'age', 'bmi', 'children', 'annual_mileage', 'vehicle_age',
        'sex_encoded', 'smoker_encoded', 'region_encoded',
        'vehicle_make_encoded', 'usage_type_encoded', 'fuel_type_encoded',
        'age_group_encoded', 'vehicle_category_encoded',
        'high_mileage', 'old_vehicle'
    ]
    
    X = df_encoded[feature_cols]
    y = df_encoded['monthly_premium']
    
    # Scale numerical features
    print(f"\n⚖️ Scaling features...")
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_scaled = pd.DataFrame(X_scaled, columns=feature_cols)
    
    # Train-test split
    print(f"\n✂️ Splitting data (80-20)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42
    )
    
    print(f"   Training set: {len(X_train)} records")
    print(f"   Test set: {len(X_test)} records")
    
    # Save preprocessed data and artifacts
    print(f"\n💾 Saving preprocessing artifacts...")
    os.makedirs('models', exist_ok=True)
    
    joblib.dump(scaler, 'models/scaler.pkl')
    joblib.dump(encoders, 'models/encoders.pkl')
    joblib.dump(feature_cols, 'models/feature_names.pkl')
    
    # Save train-test data
    X_train.to_csv('data/X_train.csv', index=False)
    X_test.to_csv('data/X_test.csv', index=False)
    y_train.to_csv('data/y_train.csv', index=False)
    y_test.to_csv('data/y_test.csv', index=False)
    
    # Save full processed dataset
    df.to_csv('data/insurance_processed.csv', index=False)
    
    print(f"   ✓ Saved scaler, encoders, feature names")
    print(f"   ✓ Saved train-test splits")
    print(f"   ✓ Saved processed dataset")
    
    print(f"\n✅ Preprocessing complete!")
    print(f"   Ready for model training with {len(feature_cols)} features")
    
    return X_train, X_test, y_train, y_test

if __name__ == "__main__":
    preprocess_data()
