"use client";
import React, { useState, useEffect } from 'react';
import {
  getNews,
  createNews,
  updateNews,
  deleteNews
} from '../../services/newsService';
import styles from './NewsCrud.module.css';

export default function NewsCrud() {
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

    // Carregar as notícias ao montar o componente
useEffect(() => {
    loadNews();
  }, []);

    // Função para carregar as notícias
const loadNews = async () => {
    const data = await getNews();


    const sortedData = data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setNewsList(sortedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatusMessage("");
    setStatusType("");

        // Validação de título e descrição
if (title.length < 5) {
      setStatusMessage("O título deve ter pelo menos 5 caracteres.");
      setStatusType("error");
      return;
    }
    if (description.length < 20) {
      setStatusMessage("A descrição deve ter pelo menos 20 caracteres.");
      setStatusType("error");
      return;
    }

    try {
      if (editingId) {
        await updateNews(editingId, { title, description });
        setStatusMessage("Notícia atualizada com sucesso!");
      } else {
        await createNews({ title, description });
        setStatusMessage("Notícia criada com sucesso!");
      }
      setStatusType("success");
      loadNews(); // Atualiza a lista após a criação/atualização
    } catch (error) {
      setStatusMessage("Ocorreu um erro. Tente novamente.");
      setStatusType("error");
    }

        // Limpar campos e estado de edição
setTitle('');
    setDescription('');
    setEditingId(null);
  };

    // Função para editar uma notícia
const handleEdit = (newsItem) => {
    setTitle(newsItem.title);
    setDescription(newsItem.description);
    setEditingId(newsItem.id);
  };

    // Função para excluir uma notícia
const handleDelete = async (id) => {
    await deleteNews(id);
    loadNews();
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Notícias</h2>

      {statusMessage && (
        <div className={`${styles.statusMessage} ${styles[statusType]}`}>
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Título da notícia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Conteúdo da notícia"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.textarea}
        />
        <button 
          type="submit" 
          className={editingId ? styles.buttonEdit : styles.button}
        >
          {editingId ? "Atualizar Notícia" : "Criar Notícia"}
        </button>
      </form>

      <ul className={styles.list}>
        {newsList.map((newsItem) => (
          <li key={newsItem.id} className={styles.item}>
            <h3>{newsItem.title}</h3>
            <p>{newsItem.description}</p>
            <div className={styles.buttonContainer}>
              <button 
                onClick={() => handleEdit(newsItem)} 
                className={styles.buttonEdit}
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(newsItem.id)} 
                className={styles.buttonDelete}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
