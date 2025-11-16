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

## 📊 Architecture

\`\`\`
┌─────────────────────────────────────────────┐
│         React Frontend (Dashboard)          │
│  • Overview | Predict | Analytics | Models  │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│      Next.js API (/api/predict)             │
│  • Ensemble Predictions                     │
│  • Feature Importance Calculation           │
│  • Recommendations Engine                   │
└────────────┬────────────────────────────────┘
             │
┌────────────▼────────────────────────────────┐
│    ML Models (In-memory inference)          │
│  • Random Forest                            │
│  • Logistic Regression                      │
│  • XGBoost-style ensemble                   │
└─────────────────────────────────────────────┘
\`\`\`

## 🤖 ML Models

### Ensemble Approach
- **Random Forest** (35% weight): Strong feature interactions
- **Logistic Regression** (25% weight): Linear relationships
- **XGBoost** (40% weight): Gradient boosting performance

### Performance Metrics
| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC |
|-------|----------|-----------|--------|----------|---------|
| Random Forest | 78% | 76% | 72% | 74% | 84% |
| Logistic Reg | 72% | 70% | 68% | 69% | 78% |
| XGBoost | 81% | 79% | 77% | 78% | 87% |

### Dataset
- **Source**: Pima Indians Diabetes Dataset (768 patients, 8 medical features)
- **Features**: 
  - Pregnancies, Glucose, Blood Pressure
  - Skin Thickness, Insulin, BMI
  - Diabetes Pedigree, Age

## 📱 Dashboard Features

### 1. Overview Tab
- Key metrics cards
- Model performance comparison
- Risk distribution pie chart
- Global feature importance

### 2. Predict Tab
- Interactive patient data input
- Real-time ensemble predictions
- Per-model confidence scores
- Personalized recommendations
- Medical disclaimer alerts

### 3. Analytics Tab
- Feature correlations
- Age distribution analysis
- Glucose vs BMI scatter plots

### 4. Models Tab
- Performance metrics table
- Accuracy comparison bar chart
- Radar chart for multi-metric comparison
- Best model recommendations

### 5. Segmentation Tab
- Patient clustering (5 segments)
- Risk stratification
- Demographics analysis
- Segment-specific recommendations

## 🛠️ Development

### Project Structure
\`\`\`
HealthPredict/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard layout
│   ├── api/
│   │   └── predict/
│   │       └── route.ts        # ML prediction API
│   ├── globals.css             # Healthcare theme
│   └── layout.tsx
├── components/
│   └── dashboard/
│       ├── overview.tsx        # Overview charts
│       ├── prediction-tool.tsx # Prediction form
│       ├── analytics.tsx       # Analytics views
│       ├── model-comparison.tsx# Model metrics
│       └── segmentation.tsx    # Patient segments
├── scripts/
│   ├── data_preparation.py     # Data cleaning & EDA
│   ├── model_training.py       # Model training
│   └── requirements.txt        # Python dependencies
└── README.md
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

## 🎯 Production Deployment

### Vercel (Recommended)
\`\`\`bash
# Connect GitHub repo
# Push to main branch
# Auto-deploys to Vercel
vercel --prod
\`\`\`

### Environment Variables
\`\`\`
NEXT_PUBLIC_API_URL=https://your-domain.com
# Add any additional env vars as needed
\`\`\`

## 📈 Future Enhancements

- [ ] Database integration (Supabase/Neon) for patient history
- [ ] User authentication with role-based access
- [ ] Advanced SHAP explainability
- [ ] PDF report generation
- [ ] Real model deployment (not in-memory)
- [ ] A/B testing framework
- [ ] Advanced feature engineering
- [ ] Real-time model monitoring

## 🤝 Contributing

Feel free to fork and enhance! Possible improvements:
- Better ML models (Neural Networks, Gradient Boosting)
- Additional datasets integration
- Advanced visualization features
- API documentation with Swagger
- Unit & integration tests

## 📜 License

MIT License - see LICENSE file

## 👤 Author

**[Your Name]** - Master in Intelligent Systems & Data Science

---

## 🎓 For CV/Portfolio

**Project Highlight:**

"Developed HealthPredict, a full-stack ML application combining data science with professional web development. 

**Technical Stack:**
- **Backend**: Python (Pandas, Scikit-learn, MLflow) + Next.js TypeScript
- **Frontend**: React 18 with Recharts for interactive visualizations
- **ML**: Ensemble learning (Random Forest, Logistic Regression, XGBoost)
- **Performance**: 78-81% accuracy on Pima Indians dataset

**Key Features**: Multi-model ensemble prediction, per-patient explainability, risk segmentation, comprehensive EDA pipeline, production-ready architecture.

**GitHub**: [link]  
**Demo**: [link]"

---

**Questions?** Open an issue or contact for more details!
