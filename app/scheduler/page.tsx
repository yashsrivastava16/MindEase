"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { addDays, format } from "date-fns"
import { CalendarPlus, Check } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

interface BreakSchedule {
  id: string
  title: string
  startDate: Date
  endDate: Date
  frequency: string
  times: string[]
  days: string[]
}

export default function SchedulerPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [frequency, setFrequency] = useState<string>("daily")
  const [times, setTimes] = useState<string[]>(["10:00", "15:00"])
  const [days, setDays] = useState<string[]>(["monday", "tuesday", "wednesday", "thursday", "friday"])
  const [schedules, setSchedules] = useState<BreakSchedule[]>([])
  const [success, setSuccess] = useState<boolean>(false)

  const handleAddTime = () => {
    setTimes([...times, ""])
  }

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...times]
    newTimes[index] = value
    setTimes(newTimes)
  }

  const handleRemoveTime = (index: number) => {
    const newTimes = [...times]
    newTimes.splice(index, 1)
    setTimes(newTimes)
  }

  const handleDayToggle = (day: string) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day))
    } else {
      setDays([...days, day])
    }
  }

  const handleCreateSchedule = () => {
    const newSchedule: BreakSchedule = {
      id: Date.now().toString(),
      title: "Stress Relief Breaks",
      startDate: date,
      endDate: addDays(date, 10),
      frequency,
      times: times.filter((t) => t),
      days,
    }

    setSchedules([...schedules, newSchedule])
    setSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Break Scheduler</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Regular Breaks</CardTitle>
                <CardDescription>
                  Set up a 10-day schedule of regular breaks to manage your stress levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <div className="border rounded-md p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      className="mx-auto"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekdays">Weekdays Only</SelectItem>
                      <SelectItem value="custom">Custom Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {frequency === "custom" && (
                  <div className="space-y-2">
                    <Label>Days of the Week</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={days.includes(day)}
                            onCheckedChange={() => handleDayToggle(day)}
                          />
                          <Label htmlFor={day} className="capitalize">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Break Times</Label>
                    <Button variant="outline" size="sm" onClick={handleAddTime} type="button">
                      Add Time
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {times.map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => handleTimeChange(index, e.target.value)}
                          className="flex-1"
                        />
                        {times.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveTime(index)} type="button">
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleCreateSchedule}
                  className="w-full"
                  disabled={times.filter((t) => t).length === 0 || (frequency === "custom" && days.length === 0)}
                >
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Create 10-Day Break Schedule
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Your Scheduled Breaks</CardTitle>
                <CardDescription>View your upcoming break schedule</CardDescription>
              </CardHeader>
              <CardContent>
                {success && (
                  <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded-md mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    <p>Break schedule created successfully!</p>
                  </div>
                )}

                {schedules.length > 0 ? (
                  <div className="space-y-4">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="border rounded-md p-4">
                        <h3 className="font-medium">{schedule.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {format(schedule.startDate, "MMM d, yyyy")} - {format(schedule.endDate, "MMM d, yyyy")}
                        </p>

                        <div className="text-sm">
                          <p className="mb-1">
                            <span className="font-medium">Frequency:</span>{" "}
                            {schedule.frequency === "daily"
                              ? "Every day"
                              : schedule.frequency === "weekdays"
                                ? "Weekdays only"
                                : "Custom days"}
                          </p>

                          {schedule.frequency === "custom" && (
                            <p className="mb-1">
                              <span className="font-medium">Days:</span>{" "}
                              {schedule.days.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ")}
                            </p>
                          )}

                          <p>
                            <span className="font-medium">Times:</span> {schedule.times.join(", ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No break schedules created yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

