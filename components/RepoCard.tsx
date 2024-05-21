import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { RepositoryData } from "@/lib/types"

export const RepoCard = ({ repoData }: { repoData: RepositoryData }) => {
  return (
    <a href={repoData.html_url} target="_blank" rel="noopener noreferrer" className="block bg-secondary w-full max-w-[320px] md:max-w-[400px] lg:max-w-[700px] break-words rounded-lg border border-border duration-300 transform hover:-translate-y-1">
      <Card className="bg-secondary w-full max-w-[320px] md:max-w-[400px] lg:max-w-[600px] break-words rounded-lg p-4 duration-300 border border-0 box-shadow-0">
        <CardHeader>
          <CardTitle className="underline hover:underline hover:text-blue-500 tracking-wide text-lg sm:text-xl">{repoData.name}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <p>{repoData.description}</p>

          <div className="flex flex-row gap-8 justify-around text-sm text-center">

            <div className="flex flex-col justify-start items-center">
              <p className="font-light">Stars</p>
              <div className="text-md font-bold flex flex-row items-center gap-1">
                <span className="text-xs">⭐️ </span>
                <span>
                  {Number(repoData.stargazers_count).toLocaleString("en-US", {
                    notation: "compact",
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-start items-center">
              <p className="font-light">Language</p>
              <p className="font-bold">
                {repoData.language}
              </p>
            </div>

            {/* <div className="flex flex-col justify-start items-center">
              <p className="font-light">Score</p>
              <p className="font-bold">
                {repoData.score.toFixed(2)}
              </p>
            </div> */}
          </div>
          
          {/* <a href={repoData.html_url} target="_blank" rel="noopener noreferrer" className="underline hover:underline hover:text-blue-500">
            View on GitHub
          </a> */}
        </CardContent>
      </Card>
    </a>
  )
}

export const RepoPreviewCard = () => {
  return (
    <Card className="bg-secondary w-full max-w-[320px] md:max-w-[400px] break-words rounded-lg p-4 border border-border">
      <div role="status" className="p-6 max-w-sm animate-pulse h-full flex flex-col gap-4">
        <div className="h-8 bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-4" />

        <div className="h-5 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[360px]"></div>
        <div className="h-5 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
        <div className="h-5 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[330px]"></div>
        
        <span className="sr-only">Loading...</span>
      </div>
    </Card>
  )
}