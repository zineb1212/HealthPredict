"""
HealthPredict - Data Preparation & EDA
Loads, cleans, and analyzes Pima Indians Diabetes Dataset
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import seaborn as sns
import os

def load_dataset():
    """Load Pima Indians Diabetes dataset from local CSV"""
    try:
        df = pd.read_csv('data/pima-indians-diabetes.csv')
        print("✅ Loaded from data/pima-indians-diabetes.csv")
        return df
    except FileNotFoundError:
        print("❌ Error: data/pima-indians-diabetes.csv not found!")
        print("📥 Creating sample data...")
        
        # Create minimal sample data as fallback
        data = {
            'pregnancies': [6, 1, 8, 1, 0, 5, 3, 10, 2, 8],
            'glucose': [148, 85, 183, 89, 137, 116, 78, 115, 197, 125],
            'blood_pressure': [72, 66, 64, 66, 40, 74, 50, 0, 70, 96],
            'skin_thickness': [35, 29, 0, 23, 35, 0, 32, 0, 45, 0],
            'insulin': [0, 0, 0, 94, 168, 0, 88, 0, 0, 0],
            'bmi': [33.6, 26.6, 23.3, 28.1, 43.1, 29.2, 31.0, 35.3, 30.5, 0.0],
            'diabetes_pedigree': [0.627, 0.351, 0.672, 0.167, 2.288, 0.201, 0.248, 0.134, 0.158, 0.232],
            'age': [50, 31, 32, 21, 33, 30, 26, 29, 53, 54],
            'outcome': [1, 0, 1, 0, 1, 0, 1, 0, 1, 1]
        }
        df = pd.DataFrame(data)
        print("⚠️ Using sample data - only 10 rows for testing")
        return df

def load_and_prepare_data():
    """Load and clean the dataset"""
    print("📥 Loading Pima Indians Diabetes Dataset...")
    
    # Load the data
    df = load_dataset()
    
    print(f"✅ Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")
    print(f"\n📊 Dataset Info:\n{df.describe()}")
    print(f"\n🎯 Outcome Distribution:\n{df['outcome'].value_counts()}")
    
    # Handle missing values (zeros that should be NaN)
    zero_columns = ['glucose', 'blood_pressure', 'skin_thickness', 'insulin', 'bmi']
    for col in zero_columns:
        if col in df.columns:
            df[col] = df[col].replace(0, np.nan)
    
    # Fill with median
    for col in zero_columns:
        if col in df.columns:
            df[col] = df[col].fillna(df[col].median())
    
    print(f"\n✅ Data cleaning completed")
    
    # Save processed data
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/diabetes_processed.csv', index=False)
    print(f"✅ Data saved to data/diabetes_processed.csv")
    
    return df

def generate_eda_plots(df):
    """Generate exploratory data analysis plots"""
    print("\n📊 Generating EDA visualizations...")
    
    sns.set_style("whitegrid")
    os.makedirs('eda', exist_ok=True)
    
    # 1. Distribution of features
    fig, axes = plt.subplots(2, 4, figsize=(16, 8))
    columns = df.drop('outcome', axis=1).columns
    
    for idx, col in enumerate(columns):
        row, col_idx = idx // 4, idx % 4
        axes[row, col_idx].hist(df[col], bins=30, color='steelblue', edgecolor='black')
        axes[row, col_idx].set_title(f'Distribution of {col}', fontsize=10, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('eda/distributions.png', dpi=100, bbox_inches='tight')
    print("✅ Saved: eda/distributions.png")
    plt.close()
    
    # 2. Correlation heatmap
    plt.figure(figsize=(10, 8))
    corr_matrix = df.corr()
    sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0, fmt='.2f', 
                cbar_kws={'label': 'Correlation'})
    plt.title('Feature Correlations', fontsize=14, fontweight='bold')
    plt.tight_layout()
    plt.savefig('eda/correlations.png', dpi=100, bbox_inches='tight')
    print("✅ Saved: eda/correlations.png")
    plt.close()
    
    # 3. Outcome comparison
    fig, axes = plt.subplots(2, 4, figsize=(16, 8))
    
    for idx, col in enumerate(columns):
        row, col_idx = idx // 4, idx % 4
        df[df['outcome'] == 0][col].hist(bins=20, alpha=0.6, label='No Diabetes', 
                                         ax=axes[row, col_idx], color='green')
        df[df['outcome'] == 1][col].hist(bins=20, alpha=0.6, label='Diabetes', 
                                         ax=axes[row, col_idx], color='red')
        axes[row, col_idx].set_title(f'{col} by Outcome', fontsize=10, fontweight='bold')
        axes[row, col_idx].legend()
    
    plt.tight_layout()
    plt.savefig('eda/outcome_comparison.png', dpi=100, bbox_inches='tight')
    print("✅ Saved: eda/outcome_comparison.png")
    plt.close()
    
    # 4. Statistical summary
    print("\n📈 Statistical Summary by Outcome:")
    print(df.groupby('outcome').describe())

if __name__ == "__main__":
    df = load_and_prepare_data()
    generate_eda_plots(df)
    print("\n✅ Data preparation complete!")
