// sanity.cli.js (Crie este arquivo na raiz do seu projeto)
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'v2ud7lb2', // Troque pela ID real do seu projeto
    dataset: 'production'
  }
})