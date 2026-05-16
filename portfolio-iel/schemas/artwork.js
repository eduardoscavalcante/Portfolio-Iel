// studio/schemas/artwork.js (ou o caminho onde seus schemas ficarem localizados)
export default {
  name: 'artwork',
  title: 'Obras de Arte',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Obra',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Imagem da Obra',
      type: 'image',
      options: {
        hotspot: true // Permite que o cliente corte a foto direto pelo painel se precisar
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags / Categorias',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags' // Transforma em caixinhas de tags clicáveis no painel
      }
    },
    {
      name: 'year',
      title: 'Ano de Produção',
      type: 'string',
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
    }
  ]
}