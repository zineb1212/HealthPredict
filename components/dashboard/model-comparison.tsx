"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const modelComparison = [
  {
    model: "Random Forest",
    accuracy: 0.78,
    precision: 0.76,
    recall: 0.72,
    f1: 0.74,
    roc_auc: 0.84,
    training_time: 1.2,
  },
  {
    model: "Logistic Reg",
    accuracy: 0.72,
    precision: 0.7,
    recall: 0.68,
    f1: 0.69,
    roc_auc: 0.78,
    training_time: 0.1,
  },
  {
    model: "XGBoost",
    accuracy: 0.81,
    precision: 0.79,
    recall: 0.77,
    f1: 0.78,
    roc_auc: 0.87,
    training_time: 2.5,
  },
]

const radarData = [
  { metric: "Accuracy", RF: 78, LR: 72, XGB: 81 },
  { metric: "Precision", RF: 76, LR: 70, XGB: 79 },
  { metric: "Recall", RF: 72, LR: 68, XGB: 77 },
  { metric: "F1-Score", RF: 74, LR: 69, XGB: 78 },
  { metric: "ROC-AUC", RF: 84, LR: 78, XGB: 87 },
]

export default function ModelComparison() {
  return (
    <div className="space-y-6">
      {/* Metrics Table */}
      <Card className="p-6 border-border/50 overflow-x-auto">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Performance Metrics</h3>
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-3 font-semibold text-foreground">Model</th>
              <th className="text-center py-3 font-semibold text-foreground">Accuracy</th>
              <th className="text-center py-3 font-semibold text-foreground">Precision</th>
              <th className="text-center py-3 font-semibold text-foreground">Recall</th>
              <th className="text-center py-3 font-semibold text-foreground">F1-Score</th>
              <th className="text-center py-3 font-semibold text-foreground">ROC-AUC</th>
              <th className="text-center py-3 font-semibold text-foreground">Training (s)</th>
            </tr>
          </thead>
          <tbody>
            {modelComparison.map((m, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
                <td className="py-3 font-medium">{m.model}</td>
                <td className="text-center py-3">{(m.accuracy * 100).toFixed(1)}%</td>
                <td className="text-center py-3">{(m.precision * 100).toFixed(1)}%</td>
                <td className="text-center py-3">{(m.recall * 100).toFixed(1)}%</td>
                <td className="text-center py-3 text-primary font-semibold">{(m.f1 * 100).toFixed(1)}%</td>
                <td className="text-center py-3">{(m.roc_auc * 100).toFixed(1)}%</td>
                <td className="text-center py-3">{m.training_time}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Accuracy Comparison */}
      <Card className="p-6 border-border/50">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Accuracy Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Random Forest", value: 78 },
              { name: "Logistic Reg", value: 72 },
              { name: "XGBoost", value: 81 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
            <Bar dataKey="value" fill="var(--primary)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Radar Chart */}
      <Card className="p-6 border-border/50">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Overall Performance Radar</h3>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="metric" stroke="var(--muted-foreground)" />
            <PolarRadiusAxis stroke="var(--muted-foreground)" />
            <Radar name="Random Forest" dataKey="RF" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.25} />
            <Radar name="Logistic Reg" dataKey="LR" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.25} />
            <Radar name="XGBoost" dataKey="XGB" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.25} />
            <Legend />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      {/* Best Model Card */}
      <Card className="p-6 border-2 border-primary bg-primary/5">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">Best Performing Model</p>
          <h3 className="text-2xl font-bold text-primary">XGBoost Classifier</h3>
          <p className="text-sm text-foreground">
            XGBoost achieves the highest accuracy (81%) and ROC-AUC (87%), making it the recommended model for
            production deployment.
          </p>
        </div>
      </Card>
    </div>
  )
}
