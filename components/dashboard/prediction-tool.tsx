"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"

export default function PredictionTool() {
  const [formData, setFormData] = useState({
    pregnancies: 1,
    glucose: 120,
    blood_pressure: 70,
    skin_thickness: 20,
    insulin: 80,
    bmi: 25,
    diabetes_pedigree: 0.5,
    age: 35,
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      setPrediction(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskLevel = (prob) => {
    if (prob < 0.33) return { level: "Low", color: "text-green-600", bg: "bg-green-50", icon: CheckCircle2 }
    if (prob < 0.67) return { level: "Medium", color: "text-amber-600", bg: "bg-amber-50", icon: AlertTriangle }
    return { level: "High", color: "text-red-600", bg: "bg-red-50", icon: AlertCircle }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="p-8 border-border/50">
          <h3 className="font-semibold text-xl mb-6 text-foreground">Patient Data Input</h3>

          <div className="space-y-6">
            {/* Pregnancies */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Pregnancies: {formData.pregnancies}</Label>
              <Slider
                min={0}
                max={17}
                step={1}
                value={[formData.pregnancies]}
                onValueChange={(val) => setFormData({ ...formData, pregnancies: val[0] })}
                className="w-full"
              />
            </div>

            {/* Glucose */}
            <div className="space-y-2">
              <Label htmlFor="glucose" className="text-sm font-medium">
                Glucose (mg/dL)
              </Label>
              <Input
                id="glucose"
                type="number"
                value={formData.glucose}
                onChange={(e) => setFormData({ ...formData, glucose: Number.parseInt(e.target.value) || 0 })}
                className="border-border/50"
              />
            </div>

            {/* Blood Pressure */}
            <div className="space-y-2">
              <Label htmlFor="bp" className="text-sm font-medium">
                Blood Pressure (mmHg)
              </Label>
              <Input
                id="bp"
                type="number"
                value={formData.blood_pressure}
                onChange={(e) => setFormData({ ...formData, blood_pressure: Number.parseInt(e.target.value) || 0 })}
                className="border-border/50"
              />
            </div>

            {/* Skin Thickness */}
            <div className="space-y-2">
              <Label htmlFor="skin" className="text-sm font-medium">
                Skin Thickness (mm)
              </Label>
              <Input
                id="skin"
                type="number"
                value={formData.skin_thickness}
                onChange={(e) => setFormData({ ...formData, skin_thickness: Number.parseInt(e.target.value) || 0 })}
                className="border-border/50"
              />
            </div>

            {/* Insulin */}
            <div className="space-y-2">
              <Label htmlFor="insulin" className="text-sm font-medium">
                Insulin (µU/ml)
              </Label>
              <Input
                id="insulin"
                type="number"
                value={formData.insulin}
                onChange={(e) => setFormData({ ...formData, insulin: Number.parseInt(e.target.value) || 0 })}
                className="border-border/50"
              />
            </div>

            {/* BMI */}
            <div className="space-y-2">
              <Label htmlFor="bmi" className="text-sm font-medium">
                BMI
              </Label>
              <Input
                id="bmi"
                type="number"
                step={0.1}
                value={formData.bmi}
                onChange={(e) => setFormData({ ...formData, bmi: Number.parseFloat(e.target.value) || 0 })}
                className="border-border/50"
              />
            </div>

            {/* Diabetes Pedigree */}
            <div className="space-y-2">
              <Label htmlFor="pedigree" className="text-sm font-medium">
                Diabetes Pedigree
              </Label>
              <Input
                id="pedigree"
                type="number"
                step={0.01}
                value={formData.diabetes_pedigree}
                onChange={(e) =>
                  setFormData({ ...formData, diabetes_pedigree: Number.parseFloat(e.target.value) || 0 })
                }
                className="border-border/50"
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">
                Age (years)
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) || 0 })}
                className="border-border/50"
              />
            </div>

            <Button
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            >
              {loading ? "Analyzing..." : "Get Prediction"}
            </Button>
          </div>
        </Card>

        {/* Results Panel */}
        <div className="space-y-6">
          {prediction && (
            <>
              {/* Risk Assessment */}
              <Card className={`p-8 border-2 ${getRiskLevel(prediction.probability).bg}`}>
                <div className="flex items-start gap-4">
                  {(() => {
                    const RiskIcon = getRiskLevel(prediction.probability).icon
                    return <RiskIcon className={`w-8 h-8 ${getRiskLevel(prediction.probability).color} mt-1`} />
                  })()}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium">Diabetes Risk Level</p>
                    <p className={`text-3xl font-bold ${getRiskLevel(prediction.probability).color}`}>
                      {getRiskLevel(prediction.probability).level}
                    </p>
                    <p className="text-2xl font-semibold text-foreground mt-2">
                      {(prediction.probability * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </Card>

              {/* Model Confidence */}
              <Card className="p-6 border-border/50">
                <h4 className="font-semibold mb-4 text-foreground">Model Ensemble Results</h4>
                <div className="space-y-3">
                  {prediction.models?.map((model, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <span className="text-sm font-medium">{model.name}</span>
                      <span className="text-sm font-bold text-primary">{(model.probability * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Feature Contributions */}
              <Card className="p-6 border-border/50">
                <h4 className="font-semibold mb-4 text-foreground">Key Risk Factors (This Patient)</h4>
                <div className="space-y-3">
                  {prediction.feature_importance?.map((feat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{feat.feature}</span>
                        <span className="text-primary font-semibold">{(feat.importance * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-secondary/30 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${feat.importance * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommendations */}
              <Card className="p-6 border-border/50 border-l-4 border-l-primary">
                <h4 className="font-semibold mb-3 text-foreground">Personalized Recommendations</h4>
                <ul className="space-y-2 text-sm">
                  {prediction.risk_level === "high" ? (
                    <>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Consult healthcare provider immediately</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Begin diabetes screening tests</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Implement strict diet & exercise regimen</span>
                      </li>
                    </>
                  ) : prediction.risk_level === "medium" ? (
                    <>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Schedule preventive health check-up</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Focus on BMI reduction & physical activity</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Monitor glucose levels regularly</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Maintain current healthy lifestyle</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Continue regular exercise & balanced diet</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Annual preventive check-ups recommended</span>
                      </li>
                    </>
                  )}
                </ul>
              </Card>
            </>
          )}

          {!prediction && (
            <Card className="p-8 flex items-center justify-center min-h-96 bg-secondary/30 border-border/50">
              <p className="text-muted-foreground text-center">
                Fill in patient data and click "Get Prediction" to analyze diabetes risk
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Medical Disclaimer */}
      <Alert className="border-l-4 border-l-destructive bg-destructive/5">
        <AlertCircle className="h-4 w-4 text-destructive" />
        <div className="ml-4">
          <p className="font-semibold text-sm">Medical Disclaimer</p>
          <p className="text-xs text-muted-foreground mt-1">
            This tool is for informational purposes only. Predictions do not replace professional medical diagnosis.
            Always consult qualified healthcare professionals for medical decisions.
          </p>
        </div>
      </Alert>
    </div>
  )
}
