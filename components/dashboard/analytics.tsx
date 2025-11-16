"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const correlationData = [
  { name: "Glucose-Outcome", value: 0.47 },
  { name: "BMI-Outcome", value: 0.29 },
  { name: "Age-Outcome", value: 0.24 },
  { name: "Insulin-Outcome", value: 0.13 },
  { name: "BP-Outcome", value: 0.05 },
]

const distributionData = [
  { range: "0-25", diabetes: 5, normal: 45 },
  { range: "25-30", diabetes: 25, normal: 85 },
  { range: "30-35", diabetes: 35, normal: 45 },
  { range: "35-40", diabetes: 55, normal: 25 },
  { range: "40+", diabetes: 34, normal: 12 },
]

export default function AnalyticsSection() {
  return (
    <Tabs defaultValue="correlation" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary/50">
        <TabsTrigger value="correlation">Correlations</TabsTrigger>
        <TabsTrigger value="distribution">Distribution</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
      </TabsList>

      <TabsContent value="correlation" className="mt-6">
        <Card className="p-6 border-border/50">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Feature Correlations with Outcome</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Bar dataKey="value" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </TabsContent>

      <TabsContent value="distribution" className="mt-6">
        <Card className="p-6 border-border/50">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Age Distribution by Outcome</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="range" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Bar dataKey="diabetes" fill="var(--destructive)" />
              <Bar dataKey="normal" fill="var(--chart-2)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </TabsContent>

      <TabsContent value="trends" className="mt-6">
        <Card className="p-6 border-border/50">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Glucose vs BMI by Risk Status</h3>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" dataKey="x" name="BMI" stroke="var(--muted-foreground)" />
              <YAxis type="number" dataKey="y" name="Glucose" stroke="var(--muted-foreground)" />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
              />
              <Scatter
                name="Low Risk"
                data={[
                  { x: 22, y: 100 },
                  { x: 24, y: 110 },
                  { x: 20, y: 95 },
                ]}
                fill="var(--chart-2)"
              />
              <Scatter
                name="High Risk"
                data={[
                  { x: 35, y: 200 },
                  { x: 38, y: 220 },
                  { x: 40, y: 230 },
                ]}
                fill="var(--destructive)"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
