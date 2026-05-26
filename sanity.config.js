import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import artwork from './src/schemas/artwork'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Iel',
  projectId: 'v2ud7lb2', 
  dataset: 'production',
  basePath: '/admin', 
  plugins: [structureTool()],
  schema: {
    types: [artwork],
  },
})