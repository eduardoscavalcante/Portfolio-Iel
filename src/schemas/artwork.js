export default {
  name: 'artwork',
  title: 'Obras de Arte',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título da Obra', type: 'string' },
    { name: 'year', title: 'Ano de Produção', type: 'string' },
    { name: 'description', title: 'Descrição / Conceito', type: 'text' },
    
    // --- 🏷️ NOVO CAMPO ESTRUTURADO DE CATEGORIAS (Filtros Principais) ---
    {
      name: 'category',
      title: 'Categoria Principal (Filtro)',
      type: 'string',
      description: 'Selecione a categoria para organizar no Portfólio e na Seção de Vendas.',
      options: {
        list: [
          { title: 'Pinturas', value: 'Pinturas' },
          { title: 'Desenhos', value: 'Desenhos' },
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

    // --- 🖼️ ENGENHARIA DE DUAS FOTOS (CARD vs LIGHTBOX) ---
    { 
      name: 'mainImage', 
      title: 'Imagem do Card (Corte Vertical)', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Esta imagem aparecerá no grid principal (Layout Vertical).'
    },
    { 
      name: 'fullImage', 
      title: 'Imagem Completa (Lightbox / Tela Cheia)', 
      type: 'image', 
      options: { hotspot: true },
      description: 'Esta imagem aparecerá quando o usuário clicar na obra (Proporção Real).'
    },
    
    // --- 🛠️ CAMPOS DA SEÇÃO SALES ---
    {
      name: 'isForSale',
      title: 'Colocar à Venda nesta Seção?',
      type: 'boolean',
      description: 'Se ativar, a obra vai aparecer flutuando na seção Obras à Venda.'
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
      type: 'string'
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