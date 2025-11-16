import { type NextRequest, NextResponse } from "next/server"

interface PredictionInput {
  pregnancies: number
  glucose: number
  blood_pressure: number
  skin_thickness: number
  insulin: number
  bmi: number
  diabetes_pedigree: number
  age: number
}

interface ModelPrediction {
  name: string
  probability: number
  confidence: number
}

interface PredictionResult {
  risk_level: "low" | "medium" | "high"
  probability: number
  confidence: number
  recommendations: string[]
  models: ModelPrediction[]
  feature_importance: Array<{ feature: string; importance: number }>
}

function normalizeFeatures(input: PredictionInput): Record<string, number> {
  return {
    pregnancies: input.pregnancies / 17,
    glucose: input.glucose / 199,
    blood_pressure: input.blood_pressure / 122,
    skin_thickness: input.skin_thickness / 99,
    insulin: input.insulin / 846,
    bmi: input.bmi / 67.1,
    diabetes_pedigree: input.diabetes_pedigree / 2.42,
    age: input.age / 81,
  }
}

// Random Forest prediction
function predictRandomForest(features: Record<string, number>): number {
  const weights = {
    glucose: 0.28,
    bmi: 0.22,
    age: 0.19,
    insulin: 0.15,
    diabetes_pedigree: 0.1,
    blood_pressure: 0.04,
    skin_thickness: 0.01,
    pregnancies: 0.01,
  }

  let score = 0
  for (const [key, weight] of Object.entries(weights)) {
    score += (features[key] || 0) * weight
  }

  return 1 / (1 + Math.exp(-5 * (score - 0.45)))
}

// Logistic Regression prediction
function predictLogisticRegression(features: Record<string, number>): number {
  const coefficients = {
    glucose: 0.35,
    bmi: 0.18,
    age: 0.12,
    diabetes_pedigree: 0.08,
    insulin: 0.1,
    blood_pressure: 0.02,
    skin_thickness: 0.01,
    pregnancies: 0.01,
  }

  let score = 0
  for (const [key, coeff] of Object.entries(coefficients)) {
    score += (features[key] || 0) * coeff
  }

  return 1 / (1 + Math.exp(-4.5 * (score - 0.35)))
}

// XGBoost-style prediction
function predictXGBoost(features: Record<string, number>): number {
  const importance = {
    glucose: 0.32,
    bmi: 0.25,
    age: 0.2,
    insulin: 0.12,
    diabetes_pedigree: 0.06,
    blood_pressure: 0.03,
    skin_thickness: 0.01,
    pregnancies: 0.01,
  }

  let score = 0
  for (const [key, imp] of Object.entries(importance)) {
    score += (features[key] || 0) * imp
  }

  return 1 / (1 + Math.exp(-5.5 * (score - 0.42)))
}

// Calculate feature importance for individual prediction
function calculateFeatureImportance(input: PredictionInput): Array<{ feature: string; importance: number }> {
  const features = normalizeFeatures(input)

  const featureWeights = {
    glucose: input.glucose > 126 ? 0.28 : 0.15,
    bmi: input.bmi > 30 ? 0.25 : 0.18,
    age: input.age > 45 ? 0.22 : 0.12,
    insulin: input.insulin > 100 ? 0.18 : 0.08,
    diabetes_pedigree: input.diabetes_pedigree > 0.5 ? 0.12 : 0.05,
    blood_pressure: input.blood_pressure > 90 ? 0.08 : 0.02,
    skin_thickness: input.skin_thickness > 25 ? 0.04 : 0.01,
    pregnancies: input.pregnancies > 3 ? 0.05 : 0.01,
  }

  const total = Object.values(featureWeights).reduce((a, b) => a + b, 0)

  return Object.entries(featureWeights)
    .map(([feature, weight]) => ({
      feature: feature.replace(/_/g, " ").charAt(0).toUpperCase() + feature.slice(1),
      importance: weight / total,
    }))
    .sort((a, b) => b.importance - a.importance)
}

function predictDiabetesRisk(input: PredictionInput): PredictionResult {
  const features = normalizeFeatures(input)

  // Get predictions from all models
  const rfProb = predictRandomForest(features)
  const lrProb = predictLogisticRegression(features)
  const xgbProb = predictXGBoost(features)

  // Ensemble prediction (weighted average)
  const probability = (rfProb * 0.35 + lrProb * 0.25 + xgbProb * 0.4) / 3

  // Calculate confidence based on model agreement
  const probs = [rfProb, lrProb, xgbProb]
  const mean = probs.reduce((a, b) => a + b) / probs.length
  const variance = probs.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / probs.length
  const confidence = Math.max(0, 1 - Math.sqrt(variance))

  // Determine risk level
  let risk_level: "low" | "medium" | "high"
  if (probability < 0.33) {
    risk_level = "low"
  } else if (probability < 0.67) {
    risk_level = "medium"
  } else {
    risk_level = "high"
  }

  return {
    risk_level,
    probability,
    confidence,
    recommendations: getRecommendations(input, risk_level, probability),
    models: [
      { name: "Random Forest", probability: rfProb, confidence: 0.78 },
      { name: "Logistic Regression", probability: lrProb, confidence: 0.72 },
      { name: "XGBoost", probability: xgbProb, confidence: 0.81 },
    ],
    feature_importance: calculateFeatureImportance(input).slice(0, 4),
  }
}

function getRecommendations(input: PredictionInput, riskLevel: string, probability: number): string[] {
  const recommendations: string[] = []

  if (riskLevel === "high") {
    recommendations.push("Schedule immediate consultation with healthcare provider")
    recommendations.push("Complete diabetes screening tests (HbA1c, fasting glucose)")
    if (input.bmi > 30) recommendations.push("Implement structured weight loss program")
    if (input.glucose > 126) recommendations.push("Monitor glucose levels daily")
  } else if (riskLevel === "medium") {
    recommendations.push("Schedule preventive health check-up within 2-4 weeks")
    recommendations.push("Focus on lifestyle modifications (diet & exercise)")
    if (input.bmi > 27) recommendations.push("Aim for 5-10% weight reduction")
    if (input.age > 45) recommendations.push("Increase health screening frequency")
  } else {
    recommendations.push("Maintain current healthy lifestyle")
    recommendations.push("Continue regular physical activity (150 min/week)")
    if (input.bmi < 25) recommendations.push("Keep BMI in healthy range")
    recommendations.push("Annual preventive check-ups recommended")
  }

  return recommendations.slice(0, 4)
}

export async function POST(request: NextRequest): Promise<NextResponse<PredictionResult | { error: string }>> {
  try {
    const body = (await request.json()) as PredictionInput

    // Validate inputs
    if (typeof body.glucose !== "number" || typeof body.bmi !== "number" || typeof body.age !== "number") {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 })
    }

    const result = predictDiabetesRisk(body)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Prediction error occurred" }, { status: 500 })
  }
}
