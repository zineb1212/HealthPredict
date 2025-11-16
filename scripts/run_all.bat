@echo off
REM HealthPredict - Full Pipeline Runner (Windows)

echo 🩺 HealthPredict - Full Pipeline Execution
echo ==========================================

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.10+
    exit /b 1
)

echo Step 1: Preparing Data
python data_preparation.py
if errorlevel 1 (
    echo ❌ Data preparation failed
    exit /b 1
)

echo Step 2: Training Models
python model_training.py
if errorlevel 1 (
    echo ❌ Model training failed
    exit /b 1
)

echo ✅ Pipeline Complete!
echo.
echo Next steps:
echo   1. View MLflow: mlflow ui (http://localhost:5000)
echo   2. Check generated files:
echo      - data/diabetes_processed.csv
echo      - models/*.pkl
echo      - eda/*.png
echo.
echo To run the web app:
echo   cd ..
echo   npm run dev
pause
