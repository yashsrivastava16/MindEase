"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAverageStressLevel } from "@/lib/stress-data"
import { Play, Pause, SkipForward, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface MusicTrack {
  id: string
  title: string
  artist: string
  duration: string
  category: string
  imageUrl: string
}

export default function MusicRecommendationsPage() {
  const [tracks, setTracks] = useState<MusicTrack[]>([])
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [stressLevel, setStressLevel] = useState<number>(5)

  useEffect(() => {
    async function loadData() {
      const avgStress = await getAverageStressLevel()
      setStressLevel(avgStress || 5)

      // Mock data - in a real app, this would come from an API based on stress level
      const mockTracks: MusicTrack[] = [
        {
          id: "1",
          title: "Calm Waters",
          artist: "Relaxation Ensemble",
          duration: "4:32",
          category: "meditation",
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "2",
          title: "Forest Whispers",
          artist: "Nature Sounds",
          duration: "5:17",
          category: "nature",
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "3",
          title: "Deep Breath",
          artist: "Mindfulness Collective",
          duration: "3:45",
          category: "meditation",
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "4",
          title: "Ocean Waves",
          artist: "Coastal Recordings",
          duration: "6:20",
          category: "nature",
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "5",
          title: "Gentle Piano",
          artist: "Classical Calm",
          duration: "4:10",
          category: "instrumental",
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
        {
          id: "6",
          title: "Floating Clouds",
          artist: "Ambient Dreams",
          duration: "5:05",
          category: "instrumental",
          imageUrl: "/placeholder.svg?height=80&width=80",
        },
      ]

      setTracks(mockTracks)
    }

    loadData()
  }, [])

  const playTrack = (track: MusicTrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    if (!currentTrack) return

    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    setCurrentTrack(tracks[nextIndex])
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Music Recommendations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Personalized Music Therapy</CardTitle>
              <CardDescription>
                Based on your average stress level of {stressLevel}/10, we've curated these tracks to help you relax
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="meditation">Meditation</TabsTrigger>
                  <TabsTrigger value="nature">Nature Sounds</TabsTrigger>
                  <TabsTrigger value="instrumental">Instrumental</TabsTrigger>
                </TabsList>

                {["all", "meditation", "nature", "instrumental"].map((category) => (
                  <TabsContent key={category} value={category} className="mt-0">
                    <div className="space-y-2">
                      {tracks
                        .filter((track) => category === "all" || track.category === category)
                        .map((track) => (
                          <div
                            key={track.id}
                            className={`flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
                              currentTrack?.id === track.id ? "bg-gray-100 dark:bg-gray-800" : ""
                            }`}
                            onClick={() => playTrack(track)}
                          >
                            <img
                              src={track.imageUrl || "/placeholder.svg"}
                              alt={track.title}
                              className="w-12 h-12 rounded-md mr-4"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">{track.title}</h3>
                              <p className="text-sm text-muted-foreground">{track.artist}</p>
                            </div>
                            <div className="text-sm text-muted-foreground">{track.duration}</div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Now Playing</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {currentTrack ? (
                <>
                  <img
                    src={currentTrack.imageUrl || "/placeholder.svg"}
                    alt={currentTrack.title}
                    className="w-48 h-48 rounded-md mb-4"
                  />
                  <h3 className="text-xl font-medium">{currentTrack.title}</h3>
                  <p className="text-muted-foreground mb-6">{currentTrack.artist}</p>

                  <div className="w-full flex items-center gap-2 mb-6">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={[volume]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setVolume(value[0])}
                      className="flex-1"
                    />
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button variant="outline" size="icon" onClick={togglePlayPause}>
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextTrack}>
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select a track to play</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

