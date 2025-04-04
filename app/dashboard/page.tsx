"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getStressData, getAverageStressLevel } from "@/lib/stress-data"
import { StressChart } from "@/components/stress-chart"
import Link from "next/link"
import { ArrowRight, Music, Video, Activity, BarChart2, PlusCircle } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

export default function DashboardPage() {
  const [averageStress, setAverageStress] = useState<number>(0)
  const [entriesCount, setEntriesCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    async function loadData() {
      const data = await getStressData()
      const avgStress = await getAverageStressLevel()

      setAverageStress(avgStress)
      setEntriesCount(data.length)

      // Generate recommendations based on stress level
      const recs = []

      if (avgStress > 7) {
        recs.push("Try deep breathing exercises")
        recs.push("Schedule regular breaks throughout your day")
        recs.push("Listen to calming music")
      } else if (avgStress > 4) {
        recs.push("Practice mindfulness for 5 minutes")
        recs.push("Take short walks during the day")
        recs.push("Consider scheduling regular breaks")
      } else {
        recs.push("Maintain your current stress management practices")
        recs.push("Continue tracking your stress levels")
        recs.push("Explore new relaxation techniques")
      }

      setRecommendations(recs)
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <Link href="/track">
            <Button className="mt-4 md:mt-0">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Stress Entry
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Stress Level</CardTitle>
              <CardDescription>Overall average from all entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageStress}/10</div>
              <div
                className={`text-sm mt-1 ${
                  averageStress <= 3 ? "text-green-500" : averageStress <= 7 ? "text-yellow-500" : "text-red-500"
                }`}
              >
                {averageStress <= 3
                  ? "Low stress - Keep it up!"
                  : averageStress <= 7
                    ? "Moderate stress - Monitor closely"
                    : "High stress - Take action"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              <CardDescription>Number of stress logs recorded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{entriesCount}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {entriesCount > 0 ? `Last entry: Today` : "No entries yet"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Stress Status</CardTitle>
              <CardDescription>Based on your average levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {averageStress <= 3 ? "Low" : averageStress <= 7 ? "Moderate" : "High"}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {entriesCount > 0 ? "Based on your recent entries" : "Add entries to see your status"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Stress Level Timeline</CardTitle>
                <CardDescription>View how your stress levels have changed over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <StressChart />
              </CardContent>
              <CardFooter>
                <Link href="/analyze" className="w-full">
                  <Button variant="outline" className="w-full">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    View Detailed Analysis
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Based on your stress patterns</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <Activity className="h-3 w-3 text-primary" />
                      </div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 mt-auto">
                <Link href="/recommendations" className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="mr-2 h-4 w-4" />
                    View All Recommendations
                  </Button>
                </Link>
                <Link href="/recommendations/music" className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <Music className="mr-2 h-4 w-4" />
                    Music Recommendations
                  </Button>
                </Link>
                <Link href="/recommendations/videos" className="w-full">
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="mr-2 h-4 w-4" />
                    Video Resources
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your stress with these quick tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/track" className="block">
                <Button variant="outline" className="w-full justify-between">
                  Log Stress Level
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/recommendations/music" className="block">
                <Button variant="outline" className="w-full justify-between">
                  Play Relaxing Music
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/recommendations/videos" className="block">
                <Button variant="outline" className="w-full justify-between">
                  Watch Guided Meditation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Breaks</CardTitle>
              <CardDescription>Your scheduled stress relief breaks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No upcoming breaks scheduled</p>
                <Link href="/scheduler">
                  <Button variant="link" className="mt-2">
                    Create a break schedule
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

