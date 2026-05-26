export default {
  name: 'artwork',
  title: 'Obras de Arte',
  type: 'document',
  fields: [
    { name: 'title', title: 'Título da Obra', type: 'string' },
    { name: 'year', title: 'Ano de Produção', type: 'string' },
    { name: 'description', title: 'Descrição / Conceito', type: 'text' },
    {
      name: 'tags',
      title: 'Tags / Categorias (Filtros Gerais)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    { name: 'mainImage', title: 'Imagem Principal', type: 'image', options: { hotspot: true } },
    
    // --- 🛠️ CAMPOS ADICIONADOS PARA A SEÇÃO SALES ---
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
      type: 'string',
      description: 'Ex: R$ 2.400 ou Sob Consulta. Deixe em branco se for Coleção Privada.'
    },
    { name: 'link', title: 'Link de Interesse / Contato', type: 'string', description: 'Ex: #contato ou link do WhatsApp' },
    { name: 'code', title: 'Código da Ficha Técnica', type: 'string', description: 'Ex: EXP_04/A' },
    { name: 'size', title: 'Dimensões', type: 'string', description: 'Ex: 100x120 cm' },
    { name: 'medium', title: 'Técnica / Material', type: 'string', description: 'Ex: Óleo e Carvão' },
    {
      name: 'surface',
      title: 'Suporte Físico (Filtro)',
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