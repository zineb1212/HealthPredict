# 🩺 HealthPredict - Advanced Diabetes Risk Prediction

**An intelligent full-stack machine learning application for diabetes risk prediction with professional healthcare analytics**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=flat-square)
![Scikit-learn](https://img.shields.io/badge/scikit--learn-1.3-orange?style=flat-square)
![MLflow](https://img.shields.io/badge/MLflow-2.7-red?style=flat-square)

## 📋 Project Overview

HealthPredict is a comprehensive full-stack application demonstrating advanced data science capabilities combined with professional web development. It features:

### ✨ Advanced Data Science Features
- **Multi-Model Ensemble**: Random Forest, Logistic Regression, XGBoost
- **Explainability**: Per-patient feature importance & SHAP-style insights
- **EDA Pipeline**: Comprehensive exploratory data analysis with visualizations
- **MLflow Tracking**: Experiment versioning and model management
- **Risk Segmentation**: Patient clustering and risk stratification

### 🎨 Professional Frontend
- **Interactive Dashboard**: Multiple analytical views (Overview, Prediction, Analytics, Models, Segmentation)
- **Real-time Visualizations**: Recharts for interactive data exploration
- **Healthcare UX**: Medical-grade design with risk level indicators
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 🔧 Modern Tech Stack
- **Backend**: Next.js 15 with TypeScript, API Routes
- **Frontend**: React 18 with Recharts for visualization
- **ML/Data**: Python, Pandas, Scikit-learn, MLflow
- **Database Ready**: Configured for future Supabase/Neon integration

## 🎓 Compétences Démontrées

**Data Science & Python**
- ✅ Pandas pour manipulation de données
- ✅ Scikit-learn pour machine learning
- ✅ MLflow pour expérimentation & versioning
- ✅ EDA et preprocessing
- ✅ Multi-modèle ensemble learning

**Développement Web**
- ✅ React avec hooks et state management
- ✅ Next.js API Routes & Server Components
- ✅ TypeScript pour type safety
- ✅ Recharts pour visualisations interactives
- ✅ Tailwind CSS pour responsive design

**DevOps & Tools**
- ✅ Git pour versionning
- ✅ Docker-ready structure
- ✅ Environment configuration
- ✅ Production-ready patterns

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- npm or pnpm

### Installation

\`\`\`bash
# Clone repository
git clone https://github.com/yourname/HealthPredict.git
cd HealthPredict

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Access at `http://localhost:3000`

### Python Setup (Optional - for model training)

\`\`\`bash
# Install Python dependencies
pip install -r scripts/requirements.txt

# Prepare data
cd scripts
python data_preparation.py

# Train models
python model_training.py

# View MLflow dashboard
mlflow ui  # http://localhost:5000
\`\`\`


### Running Scripts

\`\`\`bash
# Data preparation
python scripts/data_preparation.py
# Outputs: data/diabetes_processed.csv, eda/*.png

# Model training
python scripts/model_training.py
# Outputs: models/*.pkl, MLflow logs

# View experiments
mlflow ui
\`\`\`

## ⚠️ Medical Disclaimer

**IMPORTANT**: This tool is for **informational and educational purposes only**. 

⚠️ Predictions do NOT replace professional medical diagnosis
⚠️ Always consult qualified healthcare professionals
⚠️ Use results only as supplementary risk assessment
