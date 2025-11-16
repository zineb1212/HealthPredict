# ✅ Vérification d'Installation

Utilise ce checklist pour vérifier que tout fonctionne.

## 1. Node.js & npm

\`\`\`bash
node --version    # Doit être 18+
npm --version     # Doit être 9+
\`\`\`

✅ Résultat attendu :
\`\`\`
v18.17.0
9.6.7
\`\`\`

## 2. Installation des dépendances

\`\`\`bash
npm install
\`\`\`

✅ Résultat attendu : Aucune erreur, dossier `node_modules/` créé

## 3. Lancer l'app

\`\`\`bash
npm run dev
\`\`\`

✅ Résultat attendu :
\`\`\`
> next dev

  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
\`\`\`

## 4. Tester le Frontend

Ouvre http://localhost:3000 dans le navigateur

✅ Résultat attendu :
- Page d'accueil avec bouton "Go to Dashboard"
- Dashboard avec 5 onglets (Overview, Predict, Analytics, Models, Segments)
- Onglet Predict avec formulaire d'entrée

## 5. Tester l'API (optionnel - Python)

\`\`\`bash
python -m pip install requests
cd scripts
python test_api.py
\`\`\`

✅ Résultat attendu :
\`\`\`
🩺 HealthPredict - API Test Suite
==================================================
Testing: Low Risk Patient
✅ Status: 200
📊 Results:
  Risk Level: LOW
  Probability: 15.42%
  Confidence: 87.23%
...
\`\`\`

## 6. Python Setup (optionnel - complet)

\`\`\`bash
# Créer venv
python -m venv venv
# Activer (voir SETUP_GUIDE.md pour ta plateforme)

# Installer deps
pip install -r scripts/requirements.txt

# Vérifier installation
python -c "import pandas, sklearn, mlflow; print('✅ All ML packages installed')"
\`\`\`

✅ Résultat attendu : `✅ All ML packages installed`

## 7. Données & Modèles (optionnel)

\`\`\`bash
cd scripts

# Préparer données
python data_preparation.py
\`\`\`

✅ Résultat attendu :
\`\`\`
✅ Data saved to data/diabetes_processed.csv
✅ Saved: eda/distributions.png
✅ Saved: eda/correlations.png
\`\`\`

\`\`\`bash
# Entraîner modèles
python model_training.py
\`\`\`

✅ Résultat attendu :
\`\`\`
✅ Metrics: Accuracy=0.7857, F1=0.7391, ROC-AUC=0.8451
✅ Metrics: Accuracy=0.7208, F1=0.6875, ROC-AUC=0.7823
✅ Models saved to models/
\`\`\`

\`\`\`bash
# Voir MLflow
mlflow ui
\`\`\`

✅ Résultat attendu : http://localhost:5000 accessible

---

## 📊 Structure Vérifiée

\`\`\`
HealthPredict/
├── ✅ app/
│   ├── ✅ page.tsx
│   ├── ✅ dashboard/page.tsx
│   ├── ✅ api/predict/route.ts
│   └── ✅ layout.tsx
├── ✅ components/dashboard/
│   ├── ✅ overview.tsx
│   ├── ✅ prediction-tool.tsx
│   ├── ✅ analytics.tsx
│   ├── ✅ model-comparison.tsx
│   └── ✅ segmentation.tsx
├── ✅ scripts/
│   ├── ✅ data_preparation.py
│   ├── ✅ model_training.py
│   ├── ✅ test_api.py
│   ├── ✅ run_all.sh
│   ├── ✅ run_all.bat
│   └── ✅ requirements.txt
├── ✅ data/ (généré après data_preparation.py)
├── ✅ models/ (généré après model_training.py)
├── ✅ eda/ (généré après data_preparation.py)
├── ✅ README.md
├── ✅ SETUP_GUIDE.md
├── ✅ QUICK_START.md
└── ✅ package.json
\`\`\`

---

## 🎓 Les 3 Cas d'Usage

### 1. Je veux juste tester l'interface web
\`\`\`bash
npm install
npm run dev
# Pas besoin de Python
\`\`\`

### 2. Je veux tout avec ML (données embarquées)
\`\`\`bash
npm install
npm run dev
# Prédictions utiliseront données embarquées
\`\`\`

### 3. Je veux entraîner mes propres modèles
\`\`\`bash
npm install
python -m venv venv
source venv/bin/activate  # ou .\venv\Scripts\Activate.ps1
pip install -r scripts/requirements.txt
cd scripts
python data_preparation.py
python model_training.py
cd ..
npm run dev
# Prédictions utiliseront tes modèles entraînés
\`\`\`

---

## 🚀 Prochaine Étape

Tout fonctionne ? 

→ Lis `SETUP_GUIDE.md` pour approfondir
→ Consulte `README.md` pour la doc complète
→ Déploie sur Vercel pour aller en production !
