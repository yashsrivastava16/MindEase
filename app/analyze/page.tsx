"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getStressData, getAverageStressLevel } from "@/lib/stress-data"
import { StressChart } from "@/components/stress-chart"
import { StressSourcesChart } from "@/components/stress-sources-chart"
import { StressCalendarView } from "@/components/stress-calendar-view"
import ProtectedRoute from "@/components/protected-route"

export default function AnalyzePage() {
  const [averageStress, setAverageStress] = useState<number>(0)
  const [entriesCount, setEntriesCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadData() {
      const data = await getStressData()
      const avgStress = await getAverageStressLevel()

      setAverageStress(avgStress)
      setEntriesCount(data.length)
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <p>Loading your stress data...</p>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Analyze Your Stress</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Stress Level</CardTitle>
              <CardDescription>Overall average from all entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageStress}/10</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              <CardDescription>Number of stress logs recorded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{entriesCount}</div>
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
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="timeline">
          <TabsList className="mb-6">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="sources">Stress Sources</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Stress Level Timeline</CardTitle>
                <CardDescription>View how your stress levels have changed over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <StressChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Common Stress Sources</CardTitle>
                <CardDescription>Identify your most frequent stress triggers</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <StressSourcesChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>See your stress patterns by day</CardDescription>
              </CardHeader>
              <CardContent>
                <StressCalendarView />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}

