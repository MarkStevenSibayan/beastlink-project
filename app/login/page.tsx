"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")

  const navigateToDashboard = (role: string) => {
    switch (role) {
      case "applicant":
        router.push("/applicant/dashboard")
        break
      case "admin":
        router.push("/admin/dashboard")
        break
      case "staff":
        router.push("/staff/dashboard")
        break
      case "chairperson":
        router.push("/chairperson/dashboard")
        break
      case "interviewer":
        router.push("/interviewer/dashboard")
        break
      default:
        router.push("/applicant/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-4">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="flex items-center justify-center">
            <div className="relative h-20 w-20">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eigsb1SIMfbPbccpEtruwPhK35koLO.png"
                alt="Beastlink University Logo"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold text-emerald-800">Beastlink University</h1>
              <p className="text-sm text-emerald-600">Admission Management System</p>
            </div>
          </div>

          <div className="w-full max-w-md">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="quick-access">Quick Access</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Login</CardTitle>
                    <CardDescription>Enter your credentials to access your dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-xs text-emerald-600 hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input id="password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => navigateToDashboard("applicant")}
                    >
                      Sign In
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="quick-access">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Access</CardTitle>
                    <CardDescription>Select your role to access the corresponding dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <DashboardButton
                      title="Applicant"
                      description="Access your application status and courses"
                      onClick={() => navigateToDashboard("applicant")}
                      color="bg-blue-100 text-blue-700 hover:bg-blue-200"
                    />
                    <DashboardButton
                      title="Admin"
                      description="Manage all system aspects and users"
                      onClick={() => navigateToDashboard("admin")}
                      color="bg-purple-100 text-purple-700 hover:bg-purple-200"
                    />
                    <DashboardButton
                      title="Staff"
                      description="Process applications and manage records"
                      onClick={() => navigateToDashboard("staff")}
                      color="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    />
                    <DashboardButton
                      title="Chairperson"
                      description="Oversee department and curriculum"
                      onClick={() => navigateToDashboard("chairperson")}
                      color="bg-amber-100 text-amber-700 hover:bg-amber-200"
                    />
                    <DashboardButton
                      title="Interviewer"
                      description="Manage interview schedules and assessments"
                      onClick={() => navigateToDashboard("interviewer")}
                      color="bg-rose-100 text-rose-700 hover:bg-rose-200"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-center text-sm text-muted-foreground">
                    This is for demonstration purposes only. In a production environment, proper authentication would be
                    required.
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardButton({
  title,
  description,
  onClick,
  color,
}: {
  title: string
  description: string
  onClick: () => void
  color: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center rounded-lg p-4 text-center transition-colors ${color}`}
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm">{description}</p>
    </button>
  )
}
