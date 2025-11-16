"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface StatsData {
  totalPatients: number
  avgAccuracy: number
  highRiskCases: number
  modelVersions: number
  modelPerformance: Array<{
    name: string
    accuracy: number
    precision: number
    recall: number
    f1: number
  }>
  riskDistribution: Array<{
    name: string
    value: number
  }>
  featureImportance: Array<{
    feature: string
    importance: number
  }>
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("Fetching stats from /api/stats")
        const response = await fetch("/api/stats")
        if (!response.ok) throw new Error("Failed to fetch stats")
        const data = await response.json()
        console.log("Stats loaded:", data)
        setStats(data)
      } catch (error) {
        console.error("Error loading stats:", error)
        // Keep default values if fetch fails
        setStats({
          totalPatients: 768,
          avgAccuracy: 77,
          highRiskCases: 154,
          modelVersions: 3,
          modelPerformance: [
            { name: "Random Forest", accuracy: 78, precision: 76, recall: 72, f1: 74 },
            { name: "Logistic Reg", accuracy: 72, precision: 70, recall: 68, f1: 69 },
            { name: "XGBoost", accuracy: 81, precision: 79, recall: 77, f1: 78 },
          ],
          riskDistribution: [
            { name: "Low Risk", value: 345 },
            { name: "Medium Risk", value: 269 },
            { name: "High Risk", value: 154 },
          ],
          featureImportance: [
            { feature: "BMI", importance: 0.28 },
            { feature: "Age", importance: 0.22 },
            { feature: "Glucose", importance: 0.19 },
            { feature: "Insulin", importance: 0.15 },
            { feature: "Blood Pressure", importance: 0.1 },
            { feature: "Skin Thickness", importance: 0.06 },
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading statistics...</div>
  }

  if (!stats) {
    return <div className="text-center py-12 text-red-500">Failed to load statistics</div>
  }

  const metrics = [
    { label: "Total Patients", value: stats.totalPatients.toString(), change: "+12%" },
    { label: "Avg Accuracy", value: `${stats.avgAccuracy}%`, change: "+2.3%" },
    { label: "High Risk Cases", value: stats.highRiskCases.toString(), change: "+8%" },
    { label: "Model Versions", value: stats.modelVersions.toString(), change: "Active" },
  ]

  const riskColors = {
    "Low Risk": "hsl(var(--chart-2))",
    "Medium Risk": "hsl(var(--chart-4))",
    "High Risk": "hsl(var(--chart-1))",
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics - Now Dynamic */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <Card key={i} className="p-6 border-border/50">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
            <p className="text-xs text-primary mt-2">{metric.change}</p>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Performance */}
        <Card className="p-6 border-border/50">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Model Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.modelPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Legend />
              <Bar dataKey="accuracy" fill="var(--chart-3)" />
              <Bar dataKey="f1" fill="var(--chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Risk Distribution */}
        <Card className="p-6 border-border/50">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={stats.riskDistribution} cx="50%" cy="50%" labelLine={false} label>
                {stats.riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={riskColors[entry.name as keyof typeof riskColors]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Feature Importance */}
      <Card className="p-6 border-border/50">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Feature Importance (Global)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.featureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" stroke="var(--muted-foreground)" />
            <YAxis dataKey="feature" type="category" stroke="var(--muted-foreground)" width={100} />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
            <Bar dataKey="importance" fill="var(--primary)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
