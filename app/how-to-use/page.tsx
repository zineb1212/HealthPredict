"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, AlertTriangle, TrendingUp, Brain, BarChart3, Users } from "lucide-react"

export default function HowToUsePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4">
              ← Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground">How to Use HealthPredict</h1>
          <p className="text-muted-foreground mt-2">Complete guide for diabetes risk analysis</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Quick Start */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Quick Start</h2>
            <Card className="p-6 space-y-4 border-border/50">
              <p className="text-muted-foreground">L'application HealthPredict est simple à utiliser en 3 étapes :</p>
              <ol className="space-y-3 list-decimal list-inside">
                <li className="text-foreground">
                  <strong>Cliquez sur "Launch App"</strong> ou allez à l'onglet Dashboard
                </li>
                <li className="text-foreground">
                  <strong>Sélectionnez l'onglet "Predict"</strong> pour faire une prédiction
                </li>
                <li className="text-foreground">
                  <strong>Remplissez les données médicales</strong> et cliquez "Get Prediction"
                </li>
              </ol>
              <div className="pt-4">
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90">Aller au Dashboard</Button>
                </Link>
              </div>
            </Card>
          </section>

          {/* The 5 Tabs */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Les 5 Onglets Expliqués</h2>

            {/* Tab 1: Overview */}
            <Card className="p-6 border-l-4 border-l-blue-500 space-y-3 border-border/50">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-semibold text-foreground">Overview - Vue d'ensemble</h3>
              </div>
              <p className="text-muted-foreground">Affiche :</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>Statistiques du dataset (768 patients)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>Distribution des cas de diabète (Positifs vs Négatifs)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>Graphiques des 8 variables médicales</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>Matrice de corrélation entre variables</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                Utilité : Comprendre les données et les tendances globales
              </p>
            </Card>

            {/* Tab 2: Predict */}
            <Card className="p-6 border-l-4 border-l-green-500 space-y-3 border-border/50">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-semibold text-foreground">Predict - Prédictions</h3>
              </div>
              <p className="text-muted-foreground">Comment faire une prédiction :</p>
              <div className="space-y-4 pt-2">
                <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
                  <p className="font-semibold text-sm">Étape 1 : Entrez les données du patient</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Pregnancies (0-17) : Nombre de grossesses</li>
                    <li>• Glucose (mg/dL) : Taux de glucose sanguin</li>
                    <li>• Blood Pressure (mmHg) : Tension artérielle</li>
                    <li>• Skin Thickness (mm) : Épaisseur de la peau</li>
                    <li>• Insulin (µU/ml) : Taux d'insuline</li>
                    <li>• BMI : Indice de masse corporelle</li>
                    <li>• Diabetes Pedigree : Score d'antécédents familiaux</li>
                    <li>• Age (years) : Âge en années</li>
                  </ul>
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
                  <p className="font-semibold text-sm">Étape 2 : Cliquez "Get Prediction"</p>
                  <p className="text-sm text-muted-foreground">L'algorithme ML traite les données</p>
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
                  <p className="font-semibold text-sm">Étape 3 : Résultats</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>
                      • <strong>Risque:</strong> Faible (0-33%), Moyen (33-67%) ou Élevé (67-100%)
                    </li>
                    <li>
                      • <strong>Score de probabilité:</strong> Pourcentage de risque exact
                    </li>
                    <li>
                      • <strong>Model Ensemble Results:</strong> Prédictions de 3 modèles différents
                    </li>
                    <li>
                      • <strong>Feature Importance:</strong> Les facteurs qui influencent le plus
                    </li>
                    <li>
                      • <strong>Recommandations:</strong> Conseils personnalisés selon le risque
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground pt-2">Utilité : Prédire le risque de diabète d'un patient</p>
            </Card>

            {/* Tab 3: Analytics */}
            <Card className="p-6 border-l-4 border-l-purple-500 space-y-3 border-border/50">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold text-foreground">Analytics - Analyse Avancée</h3>
              </div>
              <p className="text-muted-foreground">Affiche :</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>
                    <strong>Feature Distributions:</strong> Distribution de chaque variable
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>
                    <strong>Correlation Heatmap:</strong> Liens entre variables
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>
                    <strong>Risk by Feature:</strong> Comment chaque variable affecte le risque
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>
                    <strong>Age vs Glucose:</strong> Relation entre âge et glucose sanguin
                  </span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                Utilité : Explorations statistiques approfondies des données
              </p>
            </Card>

            {/* Tab 4: Models */}
            <Card className="p-6 border-l-4 border-l-orange-500 space-y-3 border-border/50">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-foreground">Models - Comparaison des Modèles</h3>
              </div>
              <p className="text-muted-foreground">Compare 3 modèles ML :</p>
              <div className="space-y-3 pt-2">
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <p className="font-semibold text-sm">Random Forest</p>
                  <p className="text-xs text-muted-foreground">Modèle d'ensemble robuste - Accuracy 78.5%</p>
                </div>
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <p className="font-semibold text-sm">Logistic Regression</p>
                  <p className="text-xs text-muted-foreground">Modèle simple et interprétable - Accuracy 76.2%</p>
                </div>
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <p className="font-semibold text-sm">XGBoost</p>
                  <p className="text-xs text-muted-foreground">Gradient boosting avancé - Accuracy 79.1%</p>
                </div>
              </div>
              <div className="space-y-2 text-sm pt-4">
                <p className="font-semibold">Métriques affichées :</p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>
                    • <strong>Accuracy:</strong> Pourcentage de prédictions correctes
                  </li>
                  <li>
                    • <strong>Precision:</strong> Exactitude des cas positifs
                  </li>
                  <li>
                    • <strong>Recall:</strong> Capacité à détecter tous les cas
                  </li>
                  <li>
                    • <strong>F1-Score:</strong> Équilibre entre précision et recall
                  </li>
                  <li>
                    • <strong>ROC-AUC:</strong> Discrimination du modèle
                  </li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground pt-2">Utilité : Évaluer la qualité des modèles ML</p>
            </Card>

            {/* Tab 5: Segmentation */}
            <Card className="p-6 border-l-4 border-l-red-500 space-y-3 border-border/50">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-semibold text-foreground">Segments - Clustering des Patients</h3>
              </div>
              <p className="text-muted-foreground">Affiche :</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>
                    <strong>K-Means Clustering:</strong> Groupes de patients similaires (3 clusters)
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>
                    <strong>Taille des groupes:</strong> Nombre de patients par cluster
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>
                    <strong>Visualisation:</strong> Clusters en 2D (Glucose vs BMI)
                  </span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{" "}
                  <span>
                    <strong>Profils:</strong> Caractéristiques moyenne de chaque groupe
                  </span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground pt-2">
                Utilité : Identifier des sous-populations avec profils similaires
              </p>
            </Card>
          </section>

          {/* Risk Levels */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. Niveaux de Risque</h2>
            <Card className="p-6 space-y-4 border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-2">Faible Risque</p>
                  <p className="text-sm text-muted-foreground">Probabilité : 0-33%</p>
                  <p className="text-xs text-muted-foreground mt-2">Maintenir mode de vie sain, check-ups annuels</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Risque Moyen</p>
                  <p className="text-sm text-muted-foreground">Probabilité : 33-67%</p>
                  <p className="text-xs text-muted-foreground mt-2">Augmenter activité, réduire BMI, monitoring</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-2">Risque Élevé</p>
                  <p className="text-sm text-muted-foreground">Probabilité : 67-100%</p>
                  <p className="text-xs text-muted-foreground mt-2">Consulter médecin immédiatement, tests diabète</p>
                </div>
              </div>
            </Card>
          </section>

          {/* Example */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Exemple Pratique</h2>
            <Card className="p-6 space-y-4 border-border/50">
              <p className="text-muted-foreground">
                <strong>Cas 1 : Patient Jeune & Sain</strong>
              </p>
              <div className="bg-secondary/30 p-4 rounded-lg text-sm space-y-2">
                <p>Age: 25 | Glucose: 95 | BP: 72 | BMI: 22 | Insulin: 50</p>
                <p>→ Résultat attendu: Risque FAIBLE (10-20%)</p>
              </div>

              <p className="text-muted-foreground pt-4">
                <strong>Cas 2 : Patient avec Antécédents</strong>
              </p>
              <div className="bg-secondary/30 p-4 rounded-lg text-sm space-y-2">
                <p>Age: 45 | Glucose: 145 | BP: 85 | BMI: 28 | Insulin: 120</p>
                <p>→ Résultat attendu: Risque MOYEN (45-55%)</p>
              </div>

              <p className="text-muted-foreground pt-4">
                <strong>Cas 3 : Patient à Risque Élevé</strong>
              </p>
              <div className="bg-secondary/30 p-4 rounded-lg text-sm space-y-2">
                <p>Age: 55 | Glucose: 180 | BP: 95 | BMI: 32 | Insulin: 180</p>
                <p>→ Résultat attendu: Risque ÉLEVÉ (75-85%)</p>
              </div>
            </Card>
          </section>

          {/* Tips */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Conseils Importants</h2>
            <Card className="p-6 space-y-3 border-border/50">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Cet outil est informatif</p>
                    <p className="text-sm text-muted-foreground">
                      Les prédictions ne remplacent pas un diagnostic médical professionnel
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Précision des données</p>
                    <p className="text-sm text-muted-foreground">
                      Entrez des valeurs réalistes et vérifiées par un professionnel
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Consultez un médecin</p>
                    <p className="text-sm text-muted-foreground">
                      En cas de risque moyen ou élevé, consultez un professionnel de santé
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* CTA */}
          <div className="flex gap-4 pt-8">
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary/90 text-lg px-8">Aller au Dashboard</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="text-lg px-8 bg-transparent">
                Accueil
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
