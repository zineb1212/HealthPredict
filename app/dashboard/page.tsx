"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardOverview from "@/components/dashboard/overview"
import PredictionTool from "@/components/dashboard/prediction-tool"
import AnalyticsSection from "@/components/dashboard/analytics"
import ModelComparison from "@/components/dashboard/model-comparison"
import PatientSegmentation from "@/components/dashboard/segmentation"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Healthcare Analytics</h1>
          <p className="text-muted-foreground mt-1">Advanced diabetes risk prediction</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-5 bg-secondary/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predict">Predict</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="segmentation">Segments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="predict" className="mt-8">
            <PredictionTool />
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <AnalyticsSection />
          </TabsContent>

          <TabsContent value="models" className="mt-8">
            <ModelComparison />
          </TabsContent>

          <TabsContent value="segmentation" className="mt-8">
            <PatientSegmentation />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
