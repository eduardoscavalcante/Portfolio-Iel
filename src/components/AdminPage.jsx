import { NextStudio } from 'sanity/assets'
import config from '../sanity.config' // Certifique-se de apontar para o arquivo que você moveu para a raiz

export default function AdminPage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <NextStudio config={config} />
    </div>
  )
}