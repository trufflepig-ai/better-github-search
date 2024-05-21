import { RepositoryData } from "@/lib/types"

export async function POST(request: Request) {
  if (!process.env.TP_API_KEY) {
    throw new Error("Missing Trufflepig API key: TP_API_KEY")
  }

  const { query } = await request.json()
 
  try {
    const response = await fetch(`http://api.trufflepig.ai/v0/indexes/github-search-engine-2/search?query_text=${query}&max_results=25`, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.TP_API_KEY
      }
    })

    if (!response.ok) {
      console.error(`Error fetching data: [${response.status}] ${response.statusText}`)
      return new Response(`Error fetching data: [${response.status}] ${response.statusText}`, { status: response.status })
    }

    const results = await response.json()

    const repoDataMap = new Map<string, RepositoryData>()

    for (const result of results) {
      if (
        result.document_key && 
        !repoDataMap.has(result.document_key) && 
        result.metadata && result.score > 0.10
      ) {
        const metadata = result.metadata
        const [, owner, repo] = result.document_key.split('/').slice(-3)
   
        const repoData: RepositoryData = {
          name: owner + '/' + repo,
          description: metadata.description,
          stargazers_count: metadata.stars,
          language: metadata.language,
          html_url: result.document_key,
          score: result.score
        }

        repoDataMap.set(result.document_key, repoData)
      }
    }

    const repoData = Array.from(repoDataMap.values())
    return new Response(JSON.stringify(repoData), { status: 200 })
  } catch (error) {
    console.error("Failed to fetch repository data:", error)
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
