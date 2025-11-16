"""
HealthPredict - Test API Script
Tests the prediction API with sample data
"""

import requests
import json
from typing import Dict, Any

API_URL = "http://localhost:3000/api/predict"

# Sample patient data
SAMPLE_PATIENTS = [
    {
        "name": "Low Risk Patient",
        "data": {
            "pregnancies": 1,
            "glucose": 99,
            "blood_pressure": 65,
            "skin_thickness": 15,
            "insulin": 80,
            "bmi": 25.0,
            "diabetes_pedigree": 0.1,
            "age": 30
        }
    },
    {
        "name": "Medium Risk Patient",
        "data": {
            "pregnancies": 3,
            "glucose": 123,
            "blood_pressure": 76,
            "skin_thickness": 29,
            "insulin": 120,
            "bmi": 28.5,
            "diabetes_pedigree": 0.35,
            "age": 45
        }
    },
    {
        "name": "High Risk Patient",
        "data": {
            "pregnancies": 6,
            "glucose": 148,
            "blood_pressure": 72,
            "skin_thickness": 35,
            "insulin": 0,
            "bmi": 33.6,
            "diabetes_pedigree": 0.627,
            "age": 50
        }
    }
]

def test_prediction(patient: Dict[str, Any]) -> None:
    """Test a prediction with sample patient data"""
    print(f"\n{'='*60}")
    print(f"Testing: {patient['name']}")
    print(f"{'='*60}")
    
    try:
        response = requests.post(
            API_URL,
            json=patient['data'],
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            
            print(f"✅ Status: {response.status_code}")
            print(f"\n📊 Results:")
            print(f"  Risk Level: {result['risk_level'].upper()}")
            print(f"  Probability: {result['probability']:.2%}")
            print(f"  Confidence: {result['confidence']:.2%}")
            
            print(f"\n🤖 Model Predictions:")
            for model in result['models']:
                print(f"  {model['name']}: {model['probability']:.2%} (confidence: {model['confidence']:.2%})")
            
            print(f"\n📌 Feature Importance:")
            for feat in result['feature_importance']:
                print(f"  {feat['feature']}: {feat['importance']:.2%}")
            
            print(f"\n💡 Recommendations:")
            for i, rec in enumerate(result['recommendations'], 1):
                print(f"  {i}. {rec}")
        else:
            print(f"❌ Status: {response.status_code}")
            print(f"Error: {response.text}")
    
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure the server is running:")
        print("   npm run dev")
    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    """Run all tests"""
    print("\n🩺 HealthPredict - API Test Suite")
    print("=" * 60)
    print("Testing the prediction API with sample patient data")
    print(f"API URL: {API_URL}")
    
    for patient in SAMPLE_PATIENTS:
        test_prediction(patient)
    
    print(f"\n{'='*60}")
    print("✅ Test complete!")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    main()
