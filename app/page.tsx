import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Brain, Activity, BookOpen } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              HP
            </div>
            <span className="text-xl font-bold text-foreground">HealthPredict</span>
          </div>
          <div className="flex gap-2">
            <Link href="/how-to-use">
              <Button variant="outline">Guide d'Utilisation</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary/90">Launch App</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold text-balance text-foreground">
              AI-Powered Diabetes Risk Prediction
            </h1>
            <p className="text-xl text-muted-foreground text-balance">
              Advanced analytics and machine learning for personalized health insights
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-8 flex-wrap">
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
            <Link href="/how-to-use">
              <Button size="lg" variant="outline">
                How to Use
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Intelligent Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "Multi-Model AI",
                desc: "Random Forest, Logistic, XGBoost",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                desc: "EDA, correlations, clustering",
              },
              {
                icon: TrendingUp,
                title: "Risk Analysis",
                desc: "Explainability & trends",
              },
              {
                icon: Activity,
                title: "Recommendations",
                desc: "Personalized health actions",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Quick Start</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4">
                <span className="font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Go to Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Click "Launch App" to access the analytics dashboard with 5 interactive tabs
              </p>
            </Card>

            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4">
                <span className="font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Enter Patient Data</h3>
              <p className="text-sm text-muted-foreground">
                Fill in 8 medical parameters (glucose, blood pressure, BMI, etc.)
              </p>
            </Card>

            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4">
                <span className="font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Get Results</h3>
              <p className="text-sm text-muted-foreground">
                Receive risk level, model predictions, feature importance & recommendations
              </p>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-secondary/30 rounded-lg border border-border/50">
            <p className="text-muted-foreground mb-4">
              For detailed instructions on all features, visit the complete guide:
            </p>
            <Link href="/how-to-use">
              <Button className="bg-primary hover:bg-primary/90">Read Complete Guide</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Analyze Your Health?</h2>
          <p className="text-lg opacity-90">Get instant diabetes risk assessment with advanced ML insights</p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary">
              Start Analysis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>HealthPredict © 2025 | Data Science Application | Machine Learning</p>
          <div className="flex gap-4 justify-center mt-4 text-xs">
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/how-to-use" className="hover:text-foreground">
              How to Use
            </Link>
            <span>|</span>
            <span>3 ML Models | Explainable AI</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
