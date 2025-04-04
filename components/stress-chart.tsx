"use client"

import { useEffect, useState } from "react"
import { getStressData, type StressData } from "@/lib/stress-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"

export function StressChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const stressData = await getStressData()

      // Format data for the chart
      const chartData = stressData.map((entry: StressData) => ({
        date: format(new Date(entry.timestamp), "MMM dd"),
        stressLevel: entry.stressLevel,
        tooltip: {
          time: format(new Date(entry.timestamp), "MMM dd, yyyy h:mm a"),
          source: entry.stressSource,
          activity: entry.activity,
        },
      }))

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
        <p>No stress data available. Start tracking to see your chart.</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
        <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} tickMargin={10} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="bg-background border rounded-md shadow-md p-4 text-sm">
                  <p className="font-medium">{data.tooltip.time}</p>
                  <p className="text-muted-foreground mt-1">Stress Level: {data.stressLevel}/10</p>
                  {data.tooltip.source && <p className="text-muted-foreground">Source: {data.tooltip.source}</p>}
                  {data.tooltip.activity && <p className="text-muted-foreground">Activity: {data.tooltip.activity}</p>}
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="stressLevel"
          stroke="#f43f5e"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

