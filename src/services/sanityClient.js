// src/services/sanityClient.js
import { createClient } from '@sanity/client';
// 🛠️ ALTERADO: Mudamos o import para a versão nomeada atual
import createImageUrlBuilder from '@sanity/image-url'; 

export const client = createClient({
  projectId: 'v2ud7lb2', // 👈 CONFIRA SE ESTÁ A SUA ID REAL AQUI!
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-05-16', 
});

export const sanityClient = client;

// 🛠️ ALTERADO: Usando a nova função recomendada pelo Sanity
const builder = createImageUrlBuilder(client); 
export const urlFor = (source) => builder.image(source);