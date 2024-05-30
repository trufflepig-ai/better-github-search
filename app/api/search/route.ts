import { RepositoryData } from "@/lib/types"
import { Trufflepig } from 'trufflepig-node'

export async function POST(request: Request) {
  if (!process.env.TP_API_KEY) {
    throw new Error("Missing Trufflepig API key: TP_API_KEY")
  }

  const trufflepig = new Trufflepig(process.env.TP_API_KEY)
  const { query } = await request.json()

  const index = await trufflepig.getIndex('github-search-engine')
  if (!index) {
    return new Response("Index not found", { status: 404 })
  }
 
  try {
    const { results } = await index.search({ queryText: query, maxResults: 25})
    const repoDataMap = new Map<string, RepositoryData>()

    console.table({ query })
    console.table(results, ["documentKey", "score"])

    for (const result of results) {
      if (
        result.documentKey && 
        !repoDataMap.has(result.documentKey) && 
        result.metadata && result.score > 0.10
      ) {
        const metadata = result.metadata
        const [, owner, repo] = result.documentKey.split('/').slice(-3)
   
        const repoData: RepositoryData = {
          name: owner + '/' + repo,
          description: metadata.description,
          stargazers_count: metadata.stars,
          language: metadata.language,
          html_url: result.documentKey,
          score: result.score
        }

        repoDataMap.set(result.documentKey, repoData)
      }
    }

    const repoData = Array.from(repoDataMap.values())
    return new Response(JSON.stringify(repoData), { status: 200 })
  } catch (error) {
    console.error("Failed to fetch repository data:", error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}