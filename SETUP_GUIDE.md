# 🩺 HealthPredict - Guide Complet d'Installation & Utilisation

## Table des matières
1. [Installation Rapide](#installation-rapide)
2. [Configuration Python](#configuration-python)
3. [Entraînement des Modèles](#entraînement-des-modèles)
4. [Lancement de l'Application](#lancement-de-lapplication)
5. [Utilisation du Dashboard](#utilisation-du-dashboard)
6. [Déploiement](#déploiement)
7. [Troubleshooting](#troubleshooting)

---

## Installation Rapide

### Prérequis
- **Node.js 18+** ([Télécharger](https://nodejs.org/))
- **Python 3.10+** ([Télécharger](https://www.python.org/downloads/))
- **Git** ([Télécharger](https://git-scm.com/))
- **npm** ou **pnpm** (inclus avec Node.js)

### Étape 1 : Cloner le Repo
\`\`\`bash
git clone https://github.com/tonnom/HealthPredict.git
cd HealthPredict
\`\`\`

### Étape 2 : Installer les Dépendances Node.js
\`\`\`bash
npm install
# ou
pnpm install
\`\`\`

### Étape 3 : Lancer l'Application
\`\`\`bash
npm run dev
\`\`\`

**Accès** : Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur

✅ **L'app est maintenant en ligne !** 🎉

---

## Configuration Python

### Créer un Environnement Virtuel

#### Sur Windows (PowerShell)
\`\`\`bash
python -m venv venv
.\venv\Scripts\Activate.ps1
\`\`\`

#### Sur macOS/Linux
\`\`\`bash
python3 -m venv venv
source venv/bin/activate
\`\`\`

### Installer les Dépendances Python
\`\`\`bash
cd scripts
pip install -r requirements.txt
\`\`\`

**Sortie attendue :**
\`\`\`
Successfully installed pandas-2.0.3 numpy-1.24.3 scikit-learn-1.3.0 ...
\`\`\`

---

## Entraînement des Modèles

### Étape 1 : Préparation des Données
\`\`\`bash
python data_preparation.py
\`\`\`

**Résultat :**
\`\`\`
📥 Loading Pima Indians Diabetes Dataset...
✅ Dataset loaded: 768 rows, 9 columns
✅ Data cleaning completed
✅ Data saved to data/diabetes_processed.csv
📊 Generating EDA visualizations...
✅ Saved: eda/distributions.png
✅ Saved: eda/correlations.png
✅ Saved: eda/outcome_comparison.png
\`\`\`

**Fichiers générés :**
- `data/diabetes_processed.csv` - Dataset nettoyé
- `eda/distributions.png` - Distribution des features
- `eda/correlations.png` - Matrice de corrélation
- `eda/outcome_comparison.png` - Comparaison par outcome

### Étape 2 : Entraînement des Modèles
\`\`\`bash
python model_training.py
\`\`\`

**Résultat :**
\`\`\`
📥 Loading data...
✅ Loaded from data/diabetes_processed.csv

🤖 Training Random Forest...
✅ Metrics: Accuracy=0.7857, F1=0.7391, ROC-AUC=0.8451

🤖 Training Logistic Regression...
✅ Metrics: Accuracy=0.7208, F1=0.6875, ROC-AUC=0.7823

🤖 Training XGBoost...
✅ Metrics: Accuracy=0.8116, F1=0.7802, ROC-AUC=0.8701

✅ Model training complete!
✅ Models saved to models/
\`\`\`

**Fichiers générés :**
- `models/random_forest.pkl` - Modèle Random Forest
- `models/logistic_regression.pkl` - Modèle Logistic Regression
- `models/xgboost.pkl` - Modèle XGBoost
- `models/scaler.pkl` - Scaler pour normalisation

### Étape 3 : Visualiser les Logs MLflow (Optionnel)
\`\`\`bash
mlflow ui
\`\`\`

**Accès** : [http://localhost:5000](http://localhost:5000)

Voir :
- Toutes les expériences d'entraînement
- Comparaison des métriques entre modèles
- Paramètres utilisés
- Historique des runs

---

## Lancement de l'Application

### Depuis le Répertoire Principal
\`\`\`bash
npm run dev
\`\`\`

### Accès
- **Frontend** : http://localhost:3000
- **API** : http://localhost:3000/api/predict

### Arrêter l'Application
Appuie sur `Ctrl + C` dans le terminal

---

## Utilisation du Dashboard

### 🏠 Tab "Overview"
Vue d'ensemble générale :
- 📊 Cartes de métriques clés
- 📈 Graphique comparatif des modèles
- 🍰 Pie chart de distribution des risques
- 📌 Feature importance globale

**À faire** : Explore les statistiques générales du dataset

### 🔮 Tab "Predict"
Outil principal de prédiction :
1. **Remplis les données du patient** :
   - Pregnancies (0-17)
   - Glucose (mg/dL)
   - Blood Pressure (mmHg)
   - Skin Thickness (mm)
   - Insulin (µU/ml)
   - BMI
   - Diabetes Pedigree
   - Age (ans)

2. **Clique "Predict Risk"**

3. **Reçois** :
   - 🟢/🟡/🔴 Niveau de risque
   - 📊 Probabilité (0-100%)
   - 🤖 Prédictions de chaque modèle
   - 📌 Features les plus importants
   - 💡 Recommandations personnalisées

### 📊 Tab "Analytics"
Analyses exploratoires :
- 🔗 Matrice de corrélations
- 📈 Distribution par âge
- 🔍 Scatter plot Glucose vs BMI

### ⚙️ Tab "Models"
Comparaison des modèles :
- Tableau des performances (Accuracy, Precision, Recall, F1, ROC-AUC)
- Graphique comparatif
- Radar chart multi-métrique
- Recommandation du meilleur modèle

### 🎯 Tab "Segmentation"
Patient clustering :
- 5 segments de patients
- Analyse démographique par segment
- Recommandations spécifiques
- Profil type de chaque segment

---

## Structure des Données

### Input Format (POST /api/predict)
\`\`\`json
{
  "pregnancies": 6,
  "glucose": 148,
  "blood_pressure": 72,
  "skin_thickness": 35,
  "insulin": 0,
  "bmi": 33.6,
  "diabetes_pedigree": 0.627,
  "age": 50
}
\`\`\`

### Output Format
\`\`\`json
{
  "risk_level": "high",
  "probability": 0.78,
  "confidence": 0.85,
  "recommendations": [
    "Schedule immediate consultation with healthcare provider",
    "Complete diabetes screening tests",
    "Implement structured weight loss program",
    "Monitor glucose levels daily"
  ],
  "models": [
    {
      "name": "Random Forest",
      "probability": 0.81,
      "confidence": 0.78
    },
    {
      "name": "Logistic Regression",
      "probability": 0.75,
      "confidence": 0.72
    },
    {
      "name": "XGBoost",
      "probability": 0.80,
      "confidence": 0.81
    }
  ],
  "feature_importance": [
    { "feature": "Glucose", "importance": 0.28 },
    { "feature": "BMI", "importance": 0.22 },
    { "feature": "Age", "importance": 0.19 },
    { "feature": "Insulin", "importance": 0.15 }
  ]
}
\`\`\`

---

## Déploiement

### Sur Vercel (Recommandé)

#### Option 1 : Via GitHub
\`\`\`bash
# 1. Pousse ton repo sur GitHub
git push origin main

# 2. Va sur https://vercel.com
# 3. Clique "Import Project"
# 4. Sélectionne ton repo
# 5. Deploy !
\`\`\`

#### Option 2 : CLI Vercel
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

**Résultat** : Ton app sera en ligne sur `https://healthpredict-xxxx.vercel.app`

### Variables d'Environnement
\`\`\`env
NEXT_PUBLIC_API_URL=https://healthpredict-xxxx.vercel.app
\`\`\`

---

## Troubleshooting

### ❌ Erreur : "HTTP Error 404: Not Found"
**Cause** : Problème de chargement du dataset

**Solution** :
\`\`\`bash
# Le script utilise maintenant une donnée embarquée
# Réessaie simplement :
python data_preparation.py
\`\`\`

### ❌ Erreur : "ModuleNotFoundError: No module named 'pandas'"
**Cause** : Dépendances Python manquantes

**Solution** :
\`\`\`bash
pip install -r scripts/requirements.txt
\`\`\`

### ❌ Erreur : "Port 3000 already in use"
**Cause** : Un autre processus utilise le port 3000

**Solution** :
\`\`\`bash
# Sous Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Sous macOS/Linux
lsof -ti:3000 | xargs kill -9

# Puis relance
npm run dev
\`\`\`

### ❌ Erreur : "Python not recognized"
**Cause** : Python n'est pas dans le PATH

**Solution** :
- Réinstalle Python en cochant "Add Python to PATH"
- Redémarre le terminal après l'installation

### ❌ Prédictions ne fonctionnent pas
**Cause** : API issue

**Solution** :
\`\`\`bash
# Vérifie que l'API fonctionne
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"pregnancies":6,"glucose":148,"blood_pressure":72,"skin_thickness":35,"insulin":0,"bmi":33.6,"diabetes_pedigree":0.627,"age":50}'
\`\`\`

---

## 📚 Documentation Complète

### Fichiers Importants
- `README.md` - Vue d'ensemble du projet
- `SETUP_GUIDE.md` - Ce fichier
- `scripts/requirements.txt` - Dépendances Python
- `scripts/data_preparation.py` - Nettoyage & EDA
- `scripts/model_training.py` - Entraînement des modèles
- `app/api/predict/route.ts` - API de prédiction

### Ressources Externes
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Scikit-learn Docs](https://scikit-learn.org)
- [MLflow Docs](https://mlflow.org/docs)

---

## 🎓 Pour Mettre à Jour ton CV

**Description du Projet :**

\`\`\`
HealthPredict - Application ML Full-Stack pour Prédiction du Diabète
GitHub: https://github.com/tonnom/HealthPredict
Live Demo: https://healthpredict-xxxx.vercel.app

Application complète combinant Data Science + Web Development moderne :

**Compétences Démontrées :**
• Python & Data Science : Pandas, Scikit-learn, MLflow, EDA
• ML Engineering : Ensemble learning (Random Forest, Logistic, XGBoost)
• Web Development : Next.js 15, React 18, TypeScript
• Frontend : Recharts visualizations, Tailwind CSS, responsive design
• APIs : Next.js Route Handlers, RESTful architecture
• DevOps : GitHub, Vercel deployment, environment configuration

**Résultats :**
• Modèles ensemble avec 78-81% accuracy
• Dashboard interactif avec 5 onglets analytiques
• Pipeline ML complète (EDA → Training → Deployment)
• Patient risk stratification & personalized recommendations
\`\`\`

---

## ✅ Checklist de Configuration

- [ ] Node.js 18+ installé
- [ ] Python 3.10+ installé
- [ ] Repo cloné
- [ ] `npm install` exécuté
- [ ] Environnement virtuel Python créé
- [ ] Dépendances Python installées (`pip install -r scripts/requirements.txt`)
- [ ] `python scripts/data_preparation.py` exécuté
- [ ] `python scripts/model_training.py` exécuté
- [ ] `npm run dev` fonctionnel
- [ ] Dashboard accessible sur http://localhost:3000
- [ ] Prédictions en place
- [ ] Déployé sur Vercel (optionnel)

---

**Questions ?** Ouvre une issue sur GitHub ou contacte pour plus d'aide ! 🚀
