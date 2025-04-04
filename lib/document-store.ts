// This is a simple document store utility that mimics a NoSQL document database
// It uses localStorage for persistence in this demo

export interface Document {
  _id: string
  [key: string]: any
}

export class DocumentStore {
  private collection: string

  constructor(collection: string) {
    this.collection = collection
  }

  // Get all documents in the collection
  getAll(): Document[] {
    if (typeof window === "undefined") return []

    const data = localStorage.getItem(this.collection)
    return data ? JSON.parse(data) : []
  }

  // Find a document by ID
  findById(id: string): Document | null {
    if (typeof window === "undefined") return null

    const documents = this.getAll()
    return documents.find((doc) => doc._id === id) || null
  }

  // Find documents by a specific field value
  findBy(field: string, value: any): Document[] {
    if (typeof window === "undefined") return []

    const documents = this.getAll()
    return documents.filter((doc) => doc[field] === value)
  }

  // Insert a new document
  insert(document: Document): Document {
    if (typeof window === "undefined") return document

    const documents = this.getAll()
    documents.push(document)
    localStorage.setItem(this.collection, JSON.stringify(documents))
    return document
  }

  // Update a document
  update(id: string, updates: Partial<Document>): Document | null {
    if (typeof window === "undefined") return null

    const documents = this.getAll()
    const index = documents.findIndex((doc) => doc._id === id)

    if (index === -1) return null

    documents[index] = { ...documents[index], ...updates }
    localStorage.setItem(this.collection, JSON.stringify(documents))
    return documents[index]
  }

  // Delete a document
  delete(id: string): boolean {
    if (typeof window === "undefined") return false

    const documents = this.getAll()
    const filteredDocs = documents.filter((doc) => doc._id !== id)

    if (filteredDocs.length === documents.length) return false

    localStorage.setItem(this.collection, JSON.stringify(filteredDocs))
    return true
  }
}

// Example usage:
// const userStore = new DocumentStore('users');
// userStore.insert({ _id: 'user1', name: 'John', email: 'john@example.com' });

