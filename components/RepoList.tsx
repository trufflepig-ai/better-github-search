import { RepositoryData } from "@/lib/types"
import { RepoCard } from "@/components/RepoCard"
import React, { use } from "react"

export interface RepoListProps {
  results?: RepositoryData[]
  preview?: boolean
}

export const RepoList = ({ results, preview = false }: RepoListProps) => {
  if (!results) {
    return null
  }

  return (
    <>
      {
        results.length > 0 && (
          results.map((repo) => (
            <RepoCard key={repo.html_url} repoData={repo} />
          ))
        )
      }
    </>
  )
}

