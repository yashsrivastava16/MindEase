import { DocumentStore } from "./document-store"

export interface StressData {
  _id?: string
  userId: string
  timestamp: Date
  stressLevel: number
  stressSource: string
  symptoms: string
  location: string
  activity: string
}

// Create a document store for stress data
const stressDataStore = new DocumentStore("stress_data")

// Save stress data
export async function saveStressData(data: Omit<StressData, "_id" | "userId">): Promise<void> {
  if (typeof window === "undefined") return

  const user = localStorage.getItem("mindease_user")
  if (!user) return

  const userData = JSON.parse(user)
  const userId = userData._id || userData.id

  const stressEntry = {
    _id: `stress_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    userId,
    ...data,
    timestamp: data.timestamp.toISOString(),
  }

  stressDataStore.insert(stressEntry)
}

// Get all stress data for the current user
export async function getStressData(): Promise<StressData[]> {
  if (typeof window === "undefined") return []

  const user = localStorage.getItem("mindease_user")
  if (!user) return [] // Return empty array instead of undefined

  const userData = JSON.parse(user)
  const userId = userData._id || userData.id

  const allData = stressDataStore.getAll()
  const userStressData = allData.filter((item) => item.userId === userId)

  return userStressData.map((item: any) => ({
    ...item,
    timestamp: new Date(item.timestamp),
  }))
}

export async function getAverageStressLevel(): Promise<number> {
  const data = await getStressData()
  if (data.length === 0) return 0

  const sum = data.reduce((acc, item) => acc + item.stressLevel, 0)
  return Math.round((sum / data.length) * 10) / 10
}

export async function getStressSourcesCount(): Promise<Record<string, number>> {
  const data = await getStressData()
  const sources: Record<string, number> = {}

  data.forEach((item) => {
    const source = item.stressSource.trim()
    if (source) {
      sources[source] = (sources[source] || 0) + 1
    }
  })

  return sources
}

