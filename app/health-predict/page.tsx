"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, CheckCircle2, Activity } from "lucide-react"

interface PredictionResult {
  risk_level: "Faible" | "Moyen" | "Élevé"
  probability: number
  confidence: number
  recommendations: string[]
}

export default function HealthPredictPage() {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    skin_thickness: "",
    insulin: "",
    bmi: "",
    diabetes_pedigree: "",
    age: "",
  })

  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregnancies: Number.parseFloat(formData.pregnancies) || 0,
          glucose: Number.parseFloat(formData.glucose) || 0,
          blood_pressure: Number.parseFloat(formData.blood_pressure) || 0,
          skin_thickness: Number.parseFloat(formData.skin_thickness) || 0,
          insulin: Number.parseFloat(formData.insulin) || 0,
          bmi: Number.parseFloat(formData.bmi) || 0,
          diabetes_pedigree: Number.parseFloat(formData.diabetes_pedigree) || 0,
          age: Number.parseFloat(formData.age) || 0,
        }),
      })

      if (!response.ok) throw new Error("Erreur de prédiction")

      const data: PredictionResult = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur serveur")
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Faible":
        return "bg-green-50 border-green-200"
      case "Moyen":
        return "bg-yellow-50 border-yellow-200"
      case "Élevé":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50"
    }
  }

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "Faible":
        return "bg-green-100 text-green-800"
      case "Moyen":
        return "bg-yellow-100 text-yellow-800"
      case "Élevé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">HealthPredict</h1>
          </div>
          <p className="text-lg text-gray-600">Prédiction intelligente du risque de diabète basée sur l'IA</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-25 border-b">
                <CardTitle className="text-blue-900">Analyse de Santé</CardTitle>
                <CardDescription>Entrez vos paramètres médicaux pour obtenir une prédiction</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Age */}
                    <div>
                      <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                        Âge (ans)
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="ex: 45"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    {/* Pregnancies */}
                    <div>
                      <Label htmlFor="pregnancies" className="text-sm font-medium text-gray-700">
                        Nombre de grossesses
                      </Label>
                      <Input
                        id="pregnancies"
                        name="pregnancies"
                        type="number"
                        placeholder="ex: 2"
                        value={formData.pregnancies}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    {/* Glucose */}
                    <div>
                      <Label htmlFor="glucose" className="text-sm font-medium text-gray-700">
                        Glucose (mg/dL)
                      </Label>
                      <Input
                        id="glucose"
                        name="glucose"
                        type="number"
                        placeholder="ex: 110"
                        value={formData.glucose}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    {/* Blood Pressure */}
                    <div>
                      <Label htmlFor="blood_pressure" className="text-sm font-medium text-gray-700">
                        Tension (mmHg)
                      </Label>
                      <Input
                        id="blood_pressure"
                        name="blood_pressure"
                        type="number"
                        placeholder="ex: 120"
                        value={formData.blood_pressure}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    {/* Skin Thickness */}
                    <div>
                      <Label htmlFor="skin_thickness" className="text-sm font-medium text-gray-700">
                        Épaisseur peau (mm)
                      </Label>
                      <Input
                        id="skin_thickness"
                        name="skin_thickness"
                        type="number"
                        placeholder="ex: 20"
                        value={formData.skin_thickness}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    {/* Insulin */}
                    <div>
                      <Label htmlFor="insulin" className="text-sm font-medium text-gray-700">
                        Insuline (µU/ml)
                      </Label>
                      <Input
                        id="insulin"
                        name="insulin"
                        type="number"
                        placeholder="ex: 85"
                        value={formData.insulin}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    {/* BMI */}
                    <div>
                      <Label htmlFor="bmi" className="text-sm font-medium text-gray-700">
                        IMC (kg/m²)
                      </Label>
                      <Input
                        id="bmi"
                        name="bmi"
                        type="number"
                        placeholder="ex: 25.5"
                        value={formData.bmi}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    {/* Diabetes Pedigree */}
                    <div>
                      <Label htmlFor="diabetes_pedigree" className="text-sm font-medium text-gray-700">
                        Antécédents familiaux
                      </Label>
                      <Input
                        id="diabetes_pedigree"
                        name="diabetes_pedigree"
                        type="number"
                        placeholder="ex: 0.45"
                        value={formData.diabetes_pedigree}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {error && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-700">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Spinner className="w-4 h-4" />
                        Analyse en cours...
                      </div>
                    ) : (
                      "Obtenir ma prédiction"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div>
            {result ? (
              <Card className={`border-2 ${getRiskColor(result.risk_level)}`}>
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    {result.risk_level === "Faible" && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {result.risk_level === "Moyen" && <AlertCircle className="w-6 h-6 text-yellow-600" />}
                    {result.risk_level === "Élevé" && <AlertCircle className="w-6 h-6 text-red-600" />}
                    Résultat
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Niveau de risque</p>
                    <p
                      className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${getRiskBadgeColor(result.risk_level)}`}
                    >
                      {result.risk_level}
                    </p>
                  </div>

                  <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Probabilité</p>
                    <p className="text-2xl font-bold text-gray-900">{(result.probability * 100).toFixed(1)}%</p>
                  </div>

                  <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Confiance du modèle</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{(result.confidence * 100).toFixed(0)}%</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 mb-2">Recommandations</p>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="pt-6 text-center">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Aucune prédiction encore</p>
                  <p className="text-sm text-gray-500">Complétez le formulaire pour obtenir une analyse</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Info Section */}
        <Card className="mt-8 border-blue-100 bg-blue-25">
          <CardHeader>
            <CardTitle className="text-blue-900">À propos de HealthPredict</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-700">
            <p>
              🤖 <strong>Modèle IA :</strong> Entraîné sur le dataset Pima Indians Diabetes avec scikit-learn (Random
              Forest)
            </p>
            <p>
              📊 <strong>Précision :</strong> ~78% sur l'ensemble de test (validation croisée 5-fold)
            </p>
            <p>
              ⚠️ <strong>Disclaimer :</strong> Cet outil est à titre informatif. Consultez un professionnel médical pour
              un diagnostic
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
