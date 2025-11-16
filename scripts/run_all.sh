#!/bin/bash

# HealthPredict - Full Pipeline Runner
# Runs all data science scripts in sequence

set -e  # Exit on error

echo "🩺 HealthPredict - Full Pipeline Execution"
echo "=========================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Python
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "❌ Python not found. Please install Python 3.10+"
    exit 1
fi

# Use python3 if available, else python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

echo -e "${YELLOW}📥 Step 1: Preparing Data${NC}"
$PYTHON_CMD data_preparation.py

echo -e "${YELLOW}🤖 Step 2: Training Models${NC}"
$PYTHON_CMD model_training.py

echo -e "${GREEN}✅ Pipeline Complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. View MLflow: mlflow ui (http://localhost:5000)"
echo "  2. Check generated files:"
echo "     - data/diabetes_processed.csv"
echo "     - models/*.pkl"
echo "     - eda/*.png"
echo ""
echo "To run the web app:"
echo "  cd .."
echo "  npm run dev"
