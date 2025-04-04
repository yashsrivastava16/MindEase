"use client"

import { useEffect, useState } from "react"
import { getStressData, type StressData } from "@/lib/stress-data"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"

export function StressCalendarView() {
  const [stressData, setStressData] = useState<StressData[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getStressData()
      setStressData(data)
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-48">Loading calendar data...</div>
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getStressLevelForDay = (day: Date) => {
    const entriesForDay = stressData.filter((entry) => isSameDay(new Date(entry.timestamp), day))

    if (entriesForDay.length === 0) return null

    const sum = entriesForDay.reduce((acc, entry) => acc + entry.stressLevel, 0)
    return Math.round((sum / entriesForDay.length) * 10) / 10
  }

  const getColorForStressLevel = (level: number | null) => {
    if (level === null) return "bg-gray-100 dark:bg-gray-800"
    if (level <= 3) return "bg-green-100 dark:bg-green-900"
    if (level <= 7) return "bg-yellow-100 dark:bg-yellow-900"
    return "bg-red-100 dark:bg-red-900"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium py-2">
            {day}
          </div>
        ))}

        {days.map((day) => {
          const stressLevel = getStressLevelForDay(day)
          return (
            <div
              key={day.toString()}
              className={cn(
                "aspect-square flex flex-col items-center justify-center rounded-md text-sm",
                getColorForStressLevel(stressLevel),
              )}
            >
              <span className="font-medium">{format(day, "d")}</span>
              {stressLevel !== null && <span className="text-xs">{stressLevel}</span>}
            </div>
          )
        })}
      </div>

      <div className="flex justify-center gap-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-100 dark:bg-green-900"></div>
          <span className="text-xs">Low (1-3)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-100 dark:bg-yellow-900"></div>
          <span className="text-xs">Medium (4-7)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-100 dark:bg-red-900"></div>
          <span className="text-xs">High (8-10)</span>
        </div>
      </div>
    </div>
  )
}

