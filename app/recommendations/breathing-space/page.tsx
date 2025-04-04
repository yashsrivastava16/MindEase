"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Square } from "lucide-react"

export default function BreathingSpacePage() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [time, setTime] = useState(180) // 3 minutes in seconds
  const [currentPhase, setCurrentPhase] = useState(1)
  const [breathingState, setBreathingState] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [breathCount, setBreathCount] = useState(0)

  const phases = [
    {
      title: "Becoming Aware",
      description: "Take stock of your current experience. Notice your thoughts, feelings, and bodily sensations.",
      duration: 60, // 1 minute
    },
    {
      title: "Gathering Attention",
      description: "Gently direct your full attention to the breathing. Follow each in-breath and out-breath.",
      duration: 60, // 1 minute
    },
    {
      title: "Expanding Awareness",
      description: "Expand your awareness to your whole body, your posture, and your facial expression.",
      duration: 60, // 1 minute
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            setIsActive(false)
            return 0
          }

          // Update current phase based on time remaining
          const timeElapsed = 180 - time
          if (timeElapsed < 60) {
            setCurrentPhase(1)
          } else if (timeElapsed < 120) {
            setCurrentPhase(2)
          } else {
            setCurrentPhase(3)
          }

          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isPaused])

  // Breathing animation effect
  useEffect(() => {
    let breathingInterval: NodeJS.Timeout | null = null

    if (isActive && !isPaused) {
      breathingInterval = setInterval(() => {
        setBreathingState((current) => {
          switch (current) {
            case 'inhale':
              return 'hold'
            case 'hold':
              return 'exhale'
            case 'exhale':
              setBreathCount(prev => prev + 1)
              return 'inhale'
            default:
              return 'inhale'
          }
        })
      }, 4000) // Change breathing state every 4 seconds
    }

    return () => {
      if (breathingInterval) clearInterval(breathingInterval)
    }
  }, [isActive, isPaused])

  const toggleStart = () => {
    if (time === 0) {
      // If timer finished, reset and start
      setTime(180)
      setCurrentPhase(1)
      setBreathCount(0)
    }
    setIsActive(!isActive)
    setIsPaused(false)
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const stopTimer = () => {
    setIsActive(false)
    setIsPaused(false)
    setTime(180)
    setCurrentPhase(1)
    setBreathingState('inhale')
    setBreathCount(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentPhaseData = phases[currentPhase - 1]
  const progress = ((180 - time) / 180) * 100

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">3-Minute Breathing Space</h1>
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardDescription className="text-center text-lg font-medium">
              {breathingState === 'inhale' ? 'Breathe In...' : 
               breathingState === 'hold' ? 'Hold...' : 'Breathe Out...'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              {/* Breathing Circle Animation Container */}
              <div className="relative h-72 mb-8 flex items-center justify-center overflow-visible">
                {/* Glassmorphism background for the circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl" />
                  <div className="absolute w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl translate-x-4" />
                </div>
                
                {/* Animated breathing circle */}
                <div className="relative">
                  <div
                    className={`
                      rounded-full 
                      bg-white/10 dark:bg-gray-950/10
                      border border-white/50 dark:border-gray-800/50
                      shadow-lg
                      backdrop-blur-md
                      transition-all duration-4000 ease-in-out
                      ${
                        !isActive
                          ? 'w-48 h-48 opacity-50'
                          : breathingState === 'inhale'
                          ? 'w-64 h-64 opacity-90'
                          : breathingState === 'hold'
                          ? 'w-64 h-64 opacity-90'
                          : 'w-48 h-48 opacity-50'
                      }
                    `}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl font-bold">{formatTime(time)}</div>
                  </div>
                </div>
              </div>

              {/* Progress and Controls */}
              <div className="relative z-10 px-4">
                <Progress 
                  value={progress} 
                  className="h-2 mb-4" 
                />
                <div className="flex justify-center gap-4 mb-4">
                  {!isActive ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleStart}
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={togglePause}
                      >
                        {isPaused ? (
                          <Play className="h-6 w-6" />
                        ) : (
                          <Pause className="h-6 w-6" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={stopTimer}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Square className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Breaths completed: {breathCount}
                </div>
              </div>
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Phase {currentPhase}: {currentPhaseData.title}</CardTitle>
                <CardDescription>{currentPhaseData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <h3 className="font-medium mb-2">Instructions:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {currentPhase === 1 && (
                        <>
                          <li>Take a comfortable posture, sitting upright and relaxed</li>
                          <li>Close your eyes if you feel comfortable doing so</li>
                          <li>Notice your thoughts, emotions, and physical sensations</li>
                          <li>Simply observe without trying to change anything</li>
                        </>
                      )}
                      {currentPhase === 2 && (
                        <>
                          <li>Bring your attention to your breathing</li>
                          <li>Notice where you feel the breath most prominently</li>
                          <li>Follow each breath from start to finish</li>
                          <li>If your mind wanders, gently return to the breath</li>
                        </>
                      )}
                      {currentPhase === 3 && (
                        <>
                          <li>Expand your awareness to your whole body</li>
                          <li>Notice your posture and facial expression</li>
                          <li>Be aware of any sensations or tensions</li>
                          <li>Prepare to bring this awareness into your next activity</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About the 3-Minute Breathing Space</CardTitle>
            <CardDescription>Understanding this mindfulness practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                The 3-Minute Breathing Space is a mini-meditation that helps you step out of automatic pilot and reconnect with the present moment. It's particularly useful during stressful situations or when you need a quick reset during your day.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {phases.map((phase, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Phase {index + 1}</CardTitle>
                      <CardDescription className="text-xs">{phase.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{phase.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 