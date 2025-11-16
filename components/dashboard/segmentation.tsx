"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const segmentData = [
  { segment: "Young & Healthy", patients: 145, risk: "Low", avgAge: 28, avgBMI: 22 },
  { segment: "Active Middle-Aged", patients: 189, risk: "Low-Medium", avgAge: 45, avgBMI: 26 },
  { segment: "Pre-Diabetic Group", patients: 234, risk: "Medium", avgAge: 52, avgBMI: 30 },
  { segment: "At-Risk Seniors", patients: 167, risk: "High", avgAge: 62, avgBMI: 34 },
  { segment: "Critical Cases", patients: 33, risk: "Critical", avgAge: 58, avgBMI: 38 },
]

const segmentDistribution = segmentData.map((s, i) => ({
  name: s.segment,
  value: s.patients,
  fill: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#7c3aed"][i],
}))

export default function PatientSegmentation() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {segmentData.map((segment, i) => (
          <Card key={i} className="p-4 border-border/50">
            <p className="text-xs text-muted-foreground font-medium">{segment.segment}</p>
            <p className="text-2xl font-bold text-foreground mt-2">{segment.patients}</p>
            <p
              className={`text-xs mt-2 font-semibold ${
                segment.risk === "Low"
                  ? "text-green-600"
                  : segment.risk === "Low-Medium"
                    ? "text-blue-600"
                    : segment.risk === "Medium"
                      ? "text-amber-600"
                      : segment.risk === "High"
                        ? "text-red-600"
                        : "text-purple-600"
              }`}
            >
              {segment.risk} Risk
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="p-6 border-border/50">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Patient Distribution by Segment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={segmentDistribution} cx="50%" cy="50%" labelLine={false} label>
                {segmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Demographics */}
        <Card className="p-6 border-border/50">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Segment Demographics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={segmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="segment"
                angle={-45}
                textAnchor="end"
                height={120}
                tick={{ fontSize: 11 }}
                stroke="var(--muted-foreground)"
              />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Bar dataKey="avgAge" name="Avg Age" fill="var(--chart-3)" />
              <Bar dataKey="avgBMI" name="Avg BMI" fill="var(--chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="p-6 border-border/50 overflow-x-auto">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Detailed Segment Analysis</h3>
        <table className="w-full text-sm">
          <thead className="border-b border-border">
            <tr>
              <th className="text-left py-3 font-semibold text-foreground">Segment</th>
              <th className="text-center py-3 font-semibold text-foreground">Patients</th>
              <th className="text-center py-3 font-semibold text-foreground">Risk Level</th>
              <th className="text-center py-3 font-semibold text-foreground">Avg Age</th>
              <th className="text-center py-3 font-semibold text-foreground">Avg BMI</th>
              <th className="text-left py-3 font-semibold text-foreground">Recommendations</th>
            </tr>
          </thead>
          <tbody>
            {segmentData.map((segment, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
                <td className="py-3 font-medium">{segment.segment}</td>
                <td className="text-center py-3">{segment.patients}</td>
                <td className="text-center py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      segment.risk === "Low"
                        ? "bg-green-100 text-green-700"
                        : segment.risk === "Low-Medium"
                          ? "bg-blue-100 text-blue-700"
                          : segment.risk === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : segment.risk === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {segment.risk}
                  </span>
                </td>
                <td className="text-center py-3">{segment.avgAge}</td>
                <td className="text-center py-3">{segment.avgBMI}</td>
                <td className="py-3 text-xs">
                  {segment.risk === "Low" && "Maintain lifestyle"}
                  {segment.risk === "Low-Medium" && "Regular check-ups"}
                  {segment.risk === "Medium" && "Lifestyle changes"}
                  {segment.risk === "High" && "Medical intervention"}
                  {segment.risk === "Critical" && "Urgent care needed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
