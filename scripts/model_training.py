"""
HealthPredict - Model Training with MLflow Tracking
Trains Random Forest, Logistic Regression, and XGBoost models
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
import mlflow
import mlflow.sklearn
import joblib
import os
import warnings
warnings.filterwarnings('ignore')

def load_and_prepare_data():
    """Load data from CSV or fallback to seaborn"""
    try:
        df = pd.read_csv('data/diabetes_processed.csv')
        print("✅ Loaded from data/diabetes_processed.csv")
    except FileNotFoundError:
        print("⚠️ Running data_preparation.py first...")
        from data_preparation import load_and_prepare_data as prep
        df = prep()
    
    return df

def train_models():
    """Train multiple models and track with MLflow"""
    
    print("📥 Loading data...")
    df = load_and_prepare_data()
    
    X = df.drop('outcome', axis=1)
    y = df['outcome']
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Normalization
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # MLflow tracking
    mlflow.set_experiment("HealthPredict-Diabetes")
    
    os.makedirs('models', exist_ok=True)
    
    models_to_train = [
        {
            'name': 'Random Forest',
            'model': RandomForestClassifier(
                n_estimators=100, max_depth=10, 
                min_samples_split=5, random_state=42, n_jobs=-1
            ),
            'params': {'n_estimators': 100, 'max_depth': 10, 'min_samples_split': 5}
        },
        {
            'name': 'Logistic Regression',
            'model': LogisticRegression(max_iter=1000, random_state=42),
            'params': {'max_iter': 1000, 'solver': 'lbfgs'}
        }
    ]
    
    # Try to add XGBoost
    try:
        from xgboost import XGBClassifier
        models_to_train.append({
            'name': 'XGBoost',
            'model': XGBClassifier(
                n_estimators=100, max_depth=6, 
                learning_rate=0.1, random_state=42
            ),
            'params': {'n_estimators': 100, 'max_depth': 6, 'learning_rate': 0.1}
        })
    except ImportError:
        print("⚠️ XGBoost not installed. Install with: pip install xgboost")
    
    results = []
    
    for model_config in models_to_train:
        print(f"\n🤖 Training {model_config['name']}...")
        
        with mlflow.start_run(run_name=model_config['name']):
            model = model_config['model']
            
            # Log parameters
            mlflow.log_params(model_config['params'])
            
            # Train
            model.fit(X_train_scaled, y_train)
            
            # Predict
            y_pred = model.predict(X_test_scaled)
            y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]
            
            # Metrics
            accuracy = accuracy_score(y_test, y_pred)
            precision = precision_score(y_test, y_pred, zero_division=0)
            recall = recall_score(y_test, y_pred, zero_division=0)
            f1 = f1_score(y_test, y_pred, zero_division=0)
            roc_auc = roc_auc_score(y_test, y_pred_proba)
            
            # Cross-validation
            cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='f1')
            
            # Log metrics
            metrics = {
                'accuracy': accuracy,
                'precision': precision,
                'recall': recall,
                'f1_score': f1,
                'roc_auc': roc_auc,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std()
            }
            mlflow.log_metrics(metrics)
            
            # Log model
            mlflow.sklearn.log_model(model, "model")
            
            print(f"✅ Metrics: Accuracy={accuracy:.4f}, F1={f1:.4f}, ROC-AUC={roc_auc:.4f}")
            
            results.append({
                'model': model_config['name'],
                'accuracy': accuracy,
                'f1': f1,
                'roc_auc': roc_auc
            })
            
            # Save model
            model_name = model_config['name'].lower().replace(' ', '_')
            joblib.dump(model, f"models/{model_name}.pkl")
    
    # Save scaler
    joblib.dump(scaler, "models/scaler.pkl")
    
    print("\n✅ Model training complete!")
    print("\n📊 Results Summary:")
    results_df = pd.DataFrame(results)
    print(results_df.to_string())
    
    print(f"\n✅ Models saved to models/")
    print(f"✅ View MLflow: mlflow ui")

if __name__ == "__main__":
    train_models()
