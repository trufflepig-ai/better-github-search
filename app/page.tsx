import Image from "next/image"
import { ModeToggle } from "@components/ModeToggle"
import { SearchView } from "./search"

const Title = () => {
  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold">
        GitHub Search (but better)
      </h1>
      
      <p className="text-xl md:text-2xl text-center">
        Search for GitHub repositories using natural language.
      </p>
    </>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-grow h-full">

        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>

        <div className="flex flex-col items-center justify-center mt-8 h-full">
          <Title />
          <SearchView />
        </div>
      </main>

      <footer className="text-2xl text-center flex items-center justify-center py-4"> 
        Powered by 

        <Image 
          src={'/for_loyal_homie.png'} 
          alt='trufflepig logo' 
          width={50} 
          height={50} 
          className="mx-2" /> 

        <a href="https://www.trufflepig.ai">
          trufflepig
        </a>
      </footer>
    </div>
  )
}
