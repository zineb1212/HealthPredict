# 🐍 Python Scripts Guide - HealthPredict

Complete guide to running the data science pipeline for HealthPredict.

## 📦 Prerequisites

```bash
# Install Python 3.10+
python --version

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

## 📥 Installation

```bash
# Install dependencies
pip install -r requirements.txt

# Verify installation
python -c "import pandas, sklearn, mlflow; print('✅ All libraries installed!')"
```

## 🔄 Data Pipeline

### Step 1: Data Preparation

```bash
python data_preparation.py
```

**Output:**
- `data/diabetes_processed.csv` - Cleaned dataset
- `eda/distributions.png` - Feature distributions
- `eda/correlations.png` - Correlation heatmap
- `eda/outcome_comparison.png` - Outcome analysis

**What it does:**
1. Downloads Pima Indians Diabetes Dataset (768 samples, 8 features)
2. Handles missing values (zeros → median imputation)
3. Generates exploratory visualizations
4. Saves processed data

### Step 2: Model Training

```bash
python model_training.py
```

**Output:**
- `models/random_forest.pkl` - Trained RF model
- `models/logistic_regression.pkl` - Trained LR model
- `models/scaler.pkl` - StandardScaler for normalization
- MLflow tracking logs in `mlruns/`

**What it does:**
1. Loads and normalizes data
2. Trains 3 models with 5-fold cross-validation
3. Logs metrics to MLflow
4. Saves models for inference

### Step 3: View Results

```bash
# Launch MLflow UI
mlflow ui

# Open http://localhost:5000 in browser
```

## 📊 Detailed Pipeline

### Data Preparation (`data_preparation.py`)

**Input**: Pima Indians Diabetes Dataset (online)

**Process**:
1. **Load**: Read CSV from remote source
2. **Clean**: Replace zeros with NaN → Impute with median
3. **Validate**: Check for missing values, outliers
4. **Visualize**: Generate 3 EDA plots
5. **Export**: Save to `data/diabetes_processed.csv`

**Example**:
```python
from data_preparation import load_and_prepare_data

df = load_and_prepare_data()
# Returns cleaned DataFrame with 768 rows, 9 columns
```

### Model Training (`model_training.py`)

**Input**: Cleaned data from data preparation

**Models**:
1. **Random Forest**: 100 trees, max_depth=10
2. **Logistic Regression**: max_iter=1000

**Metrics**:
- Accuracy, Precision, Recall, F1-Score
- ROC-AUC, Cross-validation scores

**Example**:
```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

model = RandomForestClassifier(n_estimators=100, max_depth=10)
model.fit(X_train_scaled, y_train)

cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5)
print(f"CV Mean: {cv_scores.mean():.4f}")
```

## 📈 Expected Results

### Model Accuracy
- Random Forest: ~78%
- Logistic Regression: ~72%
- (XGBoost: ~81% - requires xgboost package)

### Cross-Validation
- 5-fold CV mean: 75% ± 5%
- Indicates good generalization

## 🔍 Troubleshooting

### Issue: "No module named 'pandas'"
```bash
pip install -r requirements.txt --upgrade
```

### Issue: "URLError: urlopen error"
- Check internet connection
- Dataset might be temporarily unavailable
- Use local CSV: `pd.read_csv('local_file.csv')`

### Issue: "mlflow ui" not running
```bash
pip install mlflow --upgrade
mlflow ui --port 5000 --host 127.0.0.1
```

## 📖 Resources

- [Scikit-learn Docs](https://scikit-learn.org/)
- [MLflow Docs](https://mlflow.org/docs/)
- [Pandas Tutorial](https://pandas.pydata.org/docs/)
- [Pima Diabetes Dataset](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database)

---

Questions? Check `README.md` for more info!
