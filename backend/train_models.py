import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
import os

def train_premium_predictor():
    """Train ML model to predict insurance premiums"""
    
    print("🤖 Training Premium Prediction Model...")
    print("=" * 60)
    
    # Load preprocessed data
    print("\n📂 Loading training data...")
    X_train = pd.read_csv('data/X_train.csv')
    X_test = pd.read_csv('data/X_test.csv')
    y_train = pd.read_csv('data/y_train.csv').values.ravel()
    y_test = pd.read_csv('data/y_test.csv').values.ravel()
    
    print(f"   Training samples: {len(X_train)}")
    print(f"   Test samples: {len(X_test)}")
    print(f"   Features: {len(X_train.columns)}")
    
    # Train baseline model first
    print("\n🚀 Training baseline model...")
    baseline_model = GradientBoostingRegressor(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=5,
        random_state=42
    )
    baseline_model.fit(X_train, y_train)
    
    # Baseline predictions
    baseline_train_pred = baseline_model.predict(X_train)
    baseline_test_pred = baseline_model.predict(X_test)
    
    baseline_train_r2 = r2_score(y_train, baseline_train_pred)
    baseline_test_r2 = r2_score(y_test, baseline_test_pred)
    
    print(f"   Baseline R² (Train): {baseline_train_r2:.4f}")
    print(f"   Baseline R² (Test): {baseline_test_r2:.4f}")
    
    # Hyperparameter tuning
    print("\n🔧 Hyperparameter Tuning with GridSearchCV...")
    param_grid = {
        'n_estimators': [100, 200, 300],
        'learning_rate': [0.05, 0.1, 0.15],
        'max_depth': [4, 5, 6],
        'min_samples_split': [2, 5],
        'min_samples_leaf': [1, 2]
    }
    
    gb_model = GradientBoostingRegressor(random_state=42)
    
    grid_search = GridSearchCV(
        gb_model,
        param_grid,
        cv=5,
        scoring='r2',
        n_jobs=-1,
        verbose=1
    )
    
    print("   This may take a few minutes...")
    grid_search.fit(X_train, y_train)
    
    print(f"\n✅ Best parameters found:")
    for param, value in grid_search.best_params_.items():
        print(f"   {param}: {value}")
    
    # Best model
    best_model = grid_search.best_estimator_
    
    # Predictions
    print("\n📊 Evaluating best model...")
    train_pred = best_model.predict(X_train)
    test_pred = best_model.predict(X_test)
    
    # Metrics
    train_r2 = r2_score(y_train, train_pred)
    test_r2 = r2_score(y_test, test_pred)
    train_rmse = np.sqrt(mean_squared_error(y_train, train_pred))
    test_rmse = np.sqrt(mean_squared_error(y_test, test_pred))
    train_mae = mean_absolute_error(y_train, train_pred)
    test_mae = mean_absolute_error(y_test, test_pred)
    
    print(f"\n📈 Model Performance:")
    print(f"   R² Score (Train): {train_r2:.4f}")
    print(f"   R² Score (Test): {test_r2:.4f}")
    print(f"   RMSE (Train): ₹{train_rmse:.2f}")
    print(f"   RMSE (Test): ₹{test_rmse:.2f}")
    print(f"   MAE (Train): ₹{train_mae:.2f}")
    print(f"   MAE (Test): ₹{test_mae:.2f}")
    
    # Feature importance
    print("\n🎯 Top 10 Feature Importances:")
    feature_names = joblib.load('models/feature_names.pkl')
    importances = best_model.feature_importances_
    feature_importance_df = pd.DataFrame({
        'feature': feature_names,
        'importance': importances
    }).sort_values('importance', ascending=False)
    
    for idx, row in feature_importance_df.head(10).iterrows():
        print(f"   {row['feature']}: {row['importance']:.4f}")
    
    # Save feature importance
    feature_importance_df.to_csv('models/feature_importance.csv', index=False)
    
    # Save the model
    print("\n💾 Saving model...")
    joblib.dump(best_model, 'models/premium_predictor.pkl')
    
    # Save metrics
    metrics = {
        'train_r2': train_r2,
        'test_r2': test_r2,
        'train_rmse': train_rmse,
        'test_rmse': test_rmse,
        'train_mae': train_mae,
        'test_mae': test_mae,
        'best_params': grid_search.best_params_
    }
    joblib.dump(metrics, 'models/model_metrics.pkl')
    
    print(f"   ✓ Model saved to: models/premium_predictor.pkl")
    print(f"   ✓ Metrics saved to: models/model_metrics.pkl")
    print(f"   ✓ Feature importance saved to: models/feature_importance.csv")
    
    # Sample predictions
    print("\n🔮 Sample Predictions:")
    sample_indices = np.random.choice(len(X_test), 5, replace=False)
    for idx in sample_indices:
        actual = y_test[idx]
        predicted = test_pred[idx]
        error = abs(actual - predicted)
        print(f"   Actual: ₹{actual:.2f} | Predicted: ₹{predicted:.2f} | Error: ₹{error:.2f}")
    
    print("\n" + "=" * 60)
    print("✅ Model training complete!")
    print(f"   Your premium prediction model is ready with {test_r2:.2%} accuracy")
    
    return best_model

if __name__ == "__main__":
    train_premium_predictor()
