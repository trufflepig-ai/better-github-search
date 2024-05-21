"use server"

import { RepositoryData } from "@/lib/types"

export async function search(query: string): Promise<RepositoryData[]> {
  if (!query) {
    return []
  }

  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  })

  if (!response.ok) {
    const error = new Error(`[${response.status}] ${response.statusText}`);
    (error as any).status = response.status // Add status code to the error object
    throw error
  }

  return response.json()
}