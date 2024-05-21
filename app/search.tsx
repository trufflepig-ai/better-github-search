"use client"

import React, { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RepositoryData } from "@/lib/types"
import { RepoList } from "../components/RepoList"

const SEARCH_SUGGESTIONS = [
  "I want to train a model to do image classification",
  "how to build a website using next.js",
  "pub-sub messaging architecture",
  "scalable container orchestration",
  "framework to benchmark different LLMs",
  "download videos from youtube",
  "deep learning examples using tensorflow",
  "beginner's guide to rust",
]

/**
 * Runs on the client, allows for an abort signal to cancel the request.
 */
async function search(query: string, signal: AbortSignal): Promise<RepositoryData[]> {
  if (!query) {
    return []
  }

  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query }),
    signal
  })

  if (!response.ok) {
    throw new Error(`[${response.status}] ${response.statusText}`)
  }

  return response.json()
}

export const SearchView = () => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<RepositoryData[]>([])
  const tempResultsRef = useRef<RepositoryData[]>([])
  const abortControllerRef = useRef<AbortController | null>(null)
  const ongoingSearchPromiseRef = useRef<Promise<RepositoryData[]> | null>(null)

  const update = (query: string) => {
    setQuery(query)
  
    /** Cancel the existing request. */
    abortControllerRef.current?.abort()
  
    if (!query) {
      tempResultsRef.current = []
      return
    }
  
    /** Reset the abort controller and start the latest search. */
    abortControllerRef.current = new AbortController()
  
    const searchPromise = search(query, abortControllerRef.current.signal)
    ongoingSearchPromiseRef.current = searchPromise
  
    searchPromise
      .then(data => {
        tempResultsRef.current = data
        if (ongoingSearchPromiseRef.current === searchPromise) {
          ongoingSearchPromiseRef.current = null
        }
      })
      .catch(error => {
        if ((error as any).status === 429) {
          // Handle rate limit error
          alert("We are currently experiencing a high volume of requests. Please try again later.")
        } else {
          console.error(error)
        }
        if (ongoingSearchPromiseRef.current === searchPromise) {
          ongoingSearchPromiseRef.current = null
        }
      })
  }

  const triggerSearch = async () => {
    if (ongoingSearchPromiseRef.current) {
      try {
        await ongoingSearchPromiseRef.current
      } catch (error) {
        console.error(error)
      }
    }
    setResults(tempResultsRef.current)
  }

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const SearchInput = () => (
    <div className="flex flex-row w-full max-w-[468px] space-x-4">
      <Input
        placeholder="Enter your query"
        onChange={(e) => update(e.target.value)}
        value={query}
        autoFocus
      />
      <Button
        variant="outline"
        onClick={triggerSearch}
      >
        Search
      </Button>
    </div>
  )

  const SuggestedSearches = () => (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {SEARCH_SUGGESTIONS.map((searchQuery, idx) => (
        <Button
          key={idx} 
          variant="outline"
          onClick={() => {
            update(searchQuery)
          }}
        >
          {searchQuery}
        </Button>
      ))}
    </div>
  )

  const liveResults = <RepoList results={results} />

  return (
    <div className="pt-8 flex flex-col gap-8 items-center h-full">
      <SearchInput />
      <SuggestedSearches />

      <div className="px-4 w-full grid grid-cols-1 justify-items-center justify-center items-start flex-grow gap-4 overflow-y-auto">
        {liveResults}
      </div>
    </div>
  )
}