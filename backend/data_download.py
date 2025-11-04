import pandas as pd
import numpy as np
import requests
import os

def download_and_enhance_dataset():
    """Download real insurance data and enhance for car insurance"""
    
    print("📥 Downloading insurance dataset...")
    
    # Download dataset
    url = "https://raw.githubusercontent.com/stedy/Machine-Learning-with-R-datasets/master/insurance.csv"
    response = requests.get(url)
    
    # Create data directory
    os.makedirs('data', exist_ok=True)
    
    # Save raw data
    with open('data/raw_insurance.csv', 'wb') as f:
        f.write(response.content)
    
    # Load dataset
    df = pd.read_csv('data/raw_insurance.csv')
    print(f"✓ Downloaded {len(df)} records")
    
    # Add vehicle-specific columns
    print("🚗 Adding vehicle columns...")
    
    np.random.seed(42)
    
    # Vehicle makes and models
    vehicle_data = {
        'Maruti': ['Swift', 'Baleno', 'Dzire', 'Alto', 'Vitara Brezza'],
        'Tata': ['Nexon', 'Harrier', 'Safari', 'Altroz', 'Tiago'],
        'Hyundai': ['Creta', 'i20', 'Venue', 'Verna', 'Elantra'],
        'Toyota': ['Fortuner', 'Innova', 'Camry', 'Glanza', 'Urban Cruiser'],
        'Honda': ['City', 'Amaze', 'CR-V', 'Accord', 'Jazz'],
        'Ford': ['EcoSport', 'Endeavour', 'Figo', 'Aspire', 'Mustang'],
        'Chevrolet': ['Cruze', 'Beat', 'Trailblazer', 'Spark', 'Sail'],
        'Nissan': ['Magnite', 'Kicks', 'GT-R', 'Sunny', 'Terrano'],
        'BMW': ['3 Series', '5 Series', 'X1', 'X5', '7 Series'],
        'Mercedes': ['C-Class', 'E-Class', 'GLC', 'S-Class', 'GLA'],
        'Audi': ['A4', 'A6', 'Q3', 'Q5', 'Q7']
    }
    
    # Assign vehicle makes with realistic distribution
    makes = []
    weights = {
        'Maruti': 0.20, 'Tata': 0.12, 'Hyundai': 0.18,
        'Toyota': 0.15, 'Honda': 0.12, 'Ford': 0.08,
        'Chevrolet': 0.05, 'Nissan': 0.04,
        'BMW': 0.03, 'Mercedes': 0.02, 'Audi': 0.01
    }
    
    for _ in range(len(df)):
        make = np.random.choice(list(weights.keys()), p=list(weights.values()))
        makes.append(make)
    
    df['vehicle_make'] = makes
    
    # Assign models based on make
    models = []
    for make in df['vehicle_make']:
        model = np.random.choice(vehicle_data[make])
        models.append(model)
    
    df['vehicle_model'] = models
    
    # Vehicle year (2015-2024)
    df['vehicle_year'] = np.random.randint(2015, 2025, size=len(df))
    
    # Annual mileage (5,000-30,000 km)
    df['annual_mileage'] = np.random.randint(5000, 30001, size=len(df))
    
    # Usage type
    usage_choices = ['Personal', 'Commercial', 'Ride-share']
    usage_probs = [0.80, 0.15, 0.05]
    df['usage_type'] = np.random.choice(usage_choices, size=len(df), p=usage_probs)
    
    # Fuel type
    fuel_choices = ['Petrol', 'Diesel', 'Electric']
    fuel_probs = [0.50, 0.35, 0.15]
    df['fuel_type'] = np.random.choice(fuel_choices, size=len(df), p=fuel_probs)
    
    # Rename charges to monthly_premium
    df['monthly_premium'] = df['charges']
    df.drop('charges', axis=1, inplace=True)
    
    # Derive additional features
    df['vehicle_age'] = 2025 - df['vehicle_year']
    df['yearly_premium'] = df['monthly_premium'] * 12 * 0.9  # 10% annual discount
    
    # Adjust premiums based on vehicle characteristics
    print("💰 Adjusting premiums based on vehicle characteristics...")
    
    # Luxury brands cost more
    luxury_mask = df['vehicle_make'].isin(['BMW', 'Mercedes', 'Audi'])
    df.loc[luxury_mask, 'monthly_premium'] *= 2.2
    df.loc[luxury_mask, 'yearly_premium'] *= 2.2
    
    # Commercial and ride-share cost more
    commercial_mask = df['usage_type'] == 'Commercial'
    rideshare_mask = df['usage_type'] == 'Ride-share'
    df.loc[commercial_mask, 'monthly_premium'] *= 1.4
    df.loc[commercial_mask, 'yearly_premium'] *= 1.4
    df.loc[rideshare_mask, 'monthly_premium'] *= 1.6
    df.loc[rideshare_mask, 'yearly_premium'] *= 1.6
    
    # High mileage costs more
    high_mileage_mask = df['annual_mileage'] > 20000
    df.loc[high_mileage_mask, 'monthly_premium'] *= 1.2
    df.loc[high_mileage_mask, 'yearly_premium'] *= 1.2
    
    # Electric vehicles get discount
    electric_mask = df['fuel_type'] == 'Electric'
    df.loc[electric_mask, 'monthly_premium'] *= 0.9
    df.loc[electric_mask, 'yearly_premium'] *= 0.9
    
    # Diesel slightly more expensive
    diesel_mask = df['fuel_type'] == 'Diesel'
    df.loc[diesel_mask, 'monthly_premium'] *= 1.05
    df.loc[diesel_mask, 'yearly_premium'] *= 1.05
    
    # Round premiums
    df['monthly_premium'] = df['monthly_premium'].round(2)
    df['yearly_premium'] = df['yearly_premium'].round(2)
    
    # Reorder columns
    columns_order = [
        'age', 'sex', 'bmi', 'children', 'smoker', 'region',
        'vehicle_make', 'vehicle_model', 'vehicle_year', 'vehicle_age',
        'annual_mileage', 'usage_type', 'fuel_type',
        'monthly_premium', 'yearly_premium'
    ]
    df = df[columns_order]
    
    # Save enhanced dataset
    df.to_csv('data/insurance.csv', index=False)
    
    print(f"\n✅ Dataset ready: {len(df)} records with {len(df.columns)} features")
    print(f"📊 Features: {', '.join(df.columns)}")
    print(f"\n📈 Quick Stats:")
    print(f"   Average Age: {df['age'].mean():.1f} years")
    print(f"   Average Monthly Premium: ₹{df['monthly_premium'].mean():.2f}")
    print(f"   Average Yearly Premium: ₹{df['yearly_premium'].mean():.2f}")
    print(f"   Vehicle Makes: {df['vehicle_make'].nunique()}")
    print(f"   Year Range: {df['vehicle_year'].min()}-{df['vehicle_year'].max()}")
    print(f"\n💾 Saved to: data/insurance.csv")

if __name__ == "__main__":
    download_and_enhance_dataset()
