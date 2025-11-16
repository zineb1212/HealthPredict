# 🚀 Déploiement HealthPredict

## Déploiement sur Vercel (Recommandé)

### Méthode 1 : GUI Vercel (Plus simple)

1. Va sur [vercel.com](https://vercel.com)
2. Clique "Sign Up" → connecte-toi avec GitHub
3. Clique "Add New" → "Project"
4. Sélectionne ton repo `HealthPredict`
5. Clique "Deploy"
6. Attends ~3 minutes
7. Ton app est en ligne ! 🎉

### Méthode 2 : CLI Vercel

\`\`\`bash
# 1. Installe Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod

# 3. Suis les instructions (choisis "Next.js")
\`\`\`

### Méthode 3 : GitHub Auto-Deploy

1. Push ton code sur GitHub
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. Va sur Vercel et connecte ton repo
3. À chaque push sur `main`, Vercel redéploie automatiquement

---

## Après Déploiement

### URL de ton App
\`\`\`
https://healthpredict-XXXX.vercel.app
\`\`\`

### Variables d'Environnement (optionnel)
Si tu as besoin de variables d'env:

1. Va dans Vercel Dashboard
2. Sélectionne ton projet
3. "Settings" → "Environment Variables"
4. Ajoute tes variables

Pour HealthPredict, pas besoin maintenant, mais exemple futur:
\`\`\`
NEXT_PUBLIC_API_URL=https://healthpredict-xxxx.vercel.app
\`\`\`

---

## Vérification Post-Déploiement

\`\`\`bash
# Test de l'API déployée
curl -X POST https://healthpredict-XXXX.vercel.app/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "pregnancies": 1,
    "glucose": 120,
    "blood_pressure": 70,
    "skin_thickness": 20,
    "insulin": 80,
    "bmi": 25,
    "diabetes_pedigree": 0.5,
    "age": 35
  }'
\`\`\`

✅ Résultat attendu : JSON avec prédiction

---

## Logs & Debugging

### Voir les logs de déploiement
1. Vercel Dashboard → Ton projet
2. "Deployments" → Dernier déploiement
3. "View Logs"

### Build errors ?
1. Clique "Redeploy"
2. Ou fais un nouveau push à GitHub

---

## Performance

Vercel optimise automatiquement :
- ✅ Compression des assets
- ✅ CDN global
- ✅ Serverless functions
- ✅ Auto-scaling

Pas de config nécessaire !

---

## Domaine Personnalisé (optionnel)

1. Vercel Dashboard → Settings
2. "Domains" → "Add Domain"
3. Pointe ton DNS vers Vercel
4. Attends quelques minutes pour la propagation DNS

---

## Coûts

- **Hobby Plan (Gratuit)** : Parfait pour ton portfolio
  - Deployments illimités
  - Auto-scaling inclus
  - Bandwidth: 100 GB/mois
  - Sufficient pour un projet universitaire

- **Pro Plan (≈$20/mois)** : Pour production
  - Priorité support
  - Bandwidth illimité
  - Analytics avancées

---

## Checklist Déploiement

- [ ] Code sur GitHub
- [ ] Pas d'erreurs `npm run build`
- [ ] `.env` files dans `.gitignore`
- [ ] Vercel account créé
- [ ] Repo connecté à Vercel
- [ ] Deploy réussi (statut ✅ vert)
- [ ] API fonctionne sur URL déployée
- [ ] Dashboard accessible
- [ ] Partage l'URL avec tes profs ! 📧

---

## Problèmes Courants

### Build fail : "Module not found"
\`\`\`bash
# Local: tout fonctionne, mais Vercel non ?
npm ci  # au lieu de npm install
npm run build  # teste localement
\`\`\`

### API timeout
- Vercel Hobby : timeout 10s
- Prédictions doivent finir < 10s (✅ c'est le cas)

### CORS issues
- Pas d'issue ici (même domaine)
- Mais si tu ajoutes une vraie API backend plus tard

---

**Questions ?** Ouvre une issue sur GitHub ou consulte [Vercel Docs](https://vercel.com/docs) !
