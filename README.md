# GitHub Search

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- Search for GitHub repositories using natural language.
- Uses [Trufflepig](https://www.trufflepig.ai/), an end to end semantic search API, to index GitHub repositories and provide accurate search results.

## Getting Started

To get started you'll need to create a Trufflepig account and obtain an API key as well as a GitHub access token. You can follow the instructions in the [Trufflepig documentation](https://docs.trufflepig.ai/quickstart) to set up your account and obtain your API key.

Run the development server:

```bashx
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Indexing GitHub Repositories

To index GitHub repositories, you can use the [Trufflepig](https://www.trufflepig.ai/) API. This API provides a simple and efficient way to index GitHub repositories and perform semantic search.
index_github.ipynb contains the code to index GitHub repositories using Trufflepig.

