export default {
  name: 'artwork',
  title: 'Obras de Arte',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título da Obra', type: 'string' },
    { name: 'year', title: 'Ano de Produção', type: 'string' },
    { name: 'description', title: 'Descrição / Conceito', type: 'text' },
    
    // --- ⭐ CAMPO DE PRIORIDADE/DESTAQUE ---
    {
      name: 'isFeatured',
      title: 'Obra de Destaque (Prioridade)?',
      type: 'boolean',
      description: 'Se ativar, esta obra subirá automaticamente para o topo do grid na Galeria.',
      initialValue: false
    },
    
    // --- 🏷️ CAMPO ESTRUTURADO DE CATEGORIAS (Filtros Principais) ---
    {
      name: 'category',
      title: 'Categoria Principal (Filtro)',
      type: 'string',
      description: 'Selecione a categoria para organizar no Portfólio e na Seção de Vendas.',
      options: {
        list: [
          { title: 'Pinturas', value: 'Pinturas' },
          { title: 'Desenhos', value: 'Desenhos' },
          { title: 'Prints', value: 'Prints' },
          { title: 'Design Gráfico', value: 'Design Gráfico' }
        ]
      }
    },
    
    {
      name: 'tags',
      title: 'Tags Adicionais (Opcional)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },

    // --- 🖼️ ENGENHARIA DE FOTOS (CARD vs LIGHTBOX vs CARROSSEL) ---
    { 
      name: 'mainImage', 
      title: 'Imagem do Card (Corte Vertical)', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Esta imagem aparecerá no grid principal (Layout Vertical).'
    },
    { 
      name: 'fullImage', 
      title: 'Imagem Completa (Lightbox / Início do Carrossel)', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Esta imagem aparecerá como a primeira opção quando o usuário abrir os detalhes da obra (Proporção Real).'
    },
    {
      name: 'gallery',
      title: 'Galeria de Fotos (Imagens Adicionais para o Modal)',
      type: 'array',
      description: 'Adicione fotos extras para alimentar o carrossel interativo de detalhes.',
      of: [
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    },
    
    // --- 🛠️ CAMPOS DA SEÇÃO SALES ---
    {
      name: 'isForSale',
      title: 'Colocar à Venda nesta Seção?',
      type: 'boolean',
      description: 'Se ativar, a obra vai aparecer flutuando na seção Obras à Venda e liberará os filtros de status comercial.'
    },
    {
      name: 'status',
      title: 'Status de Venda',
      type: 'string',
      options: {
        list: [
          { title: 'Disponível', value: 'Disponível' },
          { title: 'Coleção Privada', value: 'Coleção Privada' }
        ]
      }
    },
    {
      name: 'price',
      title: 'Valor da Obra (Opcional)',
      type: 'string',
      description: 'Exemplo: R$ 1.200,00 ou deixe em branco para exibir [ SOB CONSULTA ].'
    },
    { name: 'link', title: 'Link de Interesse / Contato', type: 'string' },
    { name: 'code', title: 'Código da Ficha Técnica', type: 'string' },
    { name: 'size', title: 'Dimensões', type: 'string' },
    { name: 'medium', title: 'Técnica / Material', type: 'string' },
    {
      name: 'surface',
      title: 'Suporte Físico (Filtro por Material)',
      type: 'string',
      options: {
        list: [
          { title: 'TELA', value: 'TELA' },
          { title: 'PAPEL', value: 'PAPEL' },
          { title: 'MADEIRA', value: 'MADEIRA' }
        ]
      }
    }
  ]
}