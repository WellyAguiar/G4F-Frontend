import axios from 'axios';

const API_URL = "http://host.docker.internal:3333/news";

export const getNews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createNews = async (news) => {
  // Adicionando createdAt ao criar a notícia
  const newNews = {
    ...news,
    createdAt: new Date().toISOString(), // Garantindo que a data de criação seja inserida
  };

  const response = await axios.post(API_URL, newNews);
  return response.data;
};

export const updateNews = async (id, news) => {
  // Se o campo createdAt não for fornecido, mantemos a data original
  const updatedNews = {
    ...news,
    createdAt: news.createdAt || new Date().toISOString(), // Usando a data de criação original se for uma atualização
  };

  const response = await axios.put(`${API_URL}/${id}`, updatedNews);
  return response.data;
};

export const deleteNews = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
