# 🚀 HealthPredict - Quick Start (5 Minutes)

## Le plus court chemin pour lancer l'app

### Option 1 : Frontend uniquement (2 minutes)
\`\`\`bash
npm install
npm run dev
\`\`\`
**Accès** : http://localhost:3000
- Dashboard interactif ✅
- Prédictions en temps réel ✅
- Pas besoin de Python !

### Option 2 : Full Stack avec ML (5 minutes)

#### Étape 1 : Installation Node.js
\`\`\`bash
npm install
\`\`\`

#### Étape 2 : Installation Python & données
\`\`\`bash
# Windows
python -m venv venv
.\venv\Scripts\Activate.ps1

# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r scripts/requirements.txt
\`\`\`

#### Étape 3 : Préparer les données
\`\`\`bash
cd scripts
python data_preparation.py
\`\`\`

#### Étape 4 : Entraîner les modèles
\`\`\`bash
python model_training.py
\`\`\`

#### Étape 5 : Lancer l'app
\`\`\`bash
cd ..
npm run dev
\`\`\`

**Accès** : http://localhost:3000

---

## 🧪 Tester l'API

### Avec cURL
\`\`\`bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "pregnancies": 6,
    "glucose": 148,
    "blood_pressure": 72,
    "skin_thickness": 35,
    "insulin": 0,
    "bmi": 33.6,
    "diabetes_pedigree": 0.627,
    "age": 50
  }'
\`\`\`

### Avec Python
\`\`\`bash
cd scripts
python test_api.py
\`\`\`

---

## 📊 Dashboard Tabs

| Tab | Description |
|-----|-------------|
| **Overview** | Statistiques globales & performance des modèles |
| **Predict** | Outil principal : entre données → obtiens risque |
| **Analytics** | Visualisations exploratoires |
| **Models** | Comparaison des performances |
| **Segments** | Clustering de patients |

---

## 🛠️ Commandes Utiles

\`\`\`bash
# Lancer l'app
npm run dev

# Visualiser MLflow (après training)
mlflow ui

# Exécuter tous les scripts Python
cd scripts
bash run_all.sh          # macOS/Linux
run_all.bat             # Windows

# Tester l'API
python test_api.py
\`\`\`

---

## 📁 Fichiers Clés

- `app/dashboard/page.tsx` - Interface principale
- `app/api/predict/route.ts` - Logique de prédiction
- `scripts/data_preparation.py` - Nettoyage des données
- `scripts/model_training.py` - Entraînement ML
- `SETUP_GUIDE.md` - Documentation complète

---

## ✅ Checklist Rapide

- [ ] `npm install` ✓
- [ ] `npm run dev` ✓
- [ ] Accès http://localhost:3000 ✓
- [ ] Prédictions fonctionnent ✓
- [ ] (Optionnel) Python setup ✓
- [ ] (Optionnel) `python scripts/data_preparation.py` ✓
- [ ] (Optionnel) `python scripts/model_training.py` ✓

---

## 🆘 Problèmes ?

**App ne démarre pas ?**
\`\`\`bash
npm install
npm run dev
\`\`\`

**Port 3000 occupé ?**
\`\`\`bash
# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# macOS/Linux
lsof -ti:3000 | xargs kill -9
\`\`\`

**Python error ?**
\`\`\`bash
pip install -r scripts/requirements.txt --upgrade
\`\`\`

---

Besoin d'aide ? Consulte `SETUP_GUIDE.md` pour la doc complète ! 📚
