"use client"

import { useEffect, useState } from "react"
import { getStressSourcesCount } from "@/lib/stress-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function StressSourcesChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const sourcesCount = await getStressSourcesCount()

      // Format data for the chart
      const chartData = Object.entries(sourcesCount)
        .map(([source, count]) => ({
          source,
          count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10) // Top 10 sources

      setData(chartData)
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading chart data...</div>
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>No stress sources available. Start tracking to see your chart.</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
        <XAxis type="number" />
        <YAxis dataKey="source" type="category" tick={{ fontSize: 12 }} width={80} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="bg-background border rounded-md shadow-md p-4 text-sm">
                  <p className="font-medium">{data.source}</p>
                  <p className="text-muted-foreground mt-1">Occurrences: {data.count}</p>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="count" fill="#8884d8" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

