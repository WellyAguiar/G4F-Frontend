import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? "http://localhost:3333/news" 
  : "http://host.docker.internal:3333/news";

// Função para obter todas as notícias
export const getNews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Função para criar uma nova notícia
export const createNews = async (news) => {

  const newNews = {
    ...news,
    createdAt: new Date().toISOString(), 
  };

  const response = await axios.post(API_URL, newNews);
  return response.data;
};

// Função para atualizar uma notícia existente
export const updateNews = async (id, news) => {

  const updatedNews = {
    ...news,
    createdAt: news.createdAt || new Date().toISOString(),
  };

  const response = await axios.put(`${API_URL}/${id}`, updatedNews);
  return response.data;
};

// Função para excluir uma notícia
export const deleteNews = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
