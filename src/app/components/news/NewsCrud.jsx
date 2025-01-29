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

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await getNews();
    setNewsList(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingId) {
      await updateNews(editingId, { title, description });
    } else {
      await createNews({ title, description });
    }

    setTitle('');
    setDescription('');
    setEditingId(null);
    loadNews();
  };

  const handleEdit = (newsItem) => {
    setTitle(newsItem.title);
    setDescription(newsItem.description);
    setEditingId(newsItem.id);
  };

  const handleDelete = async (id) => {
    await deleteNews(id);
    loadNews();
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Notícias</h2>
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
          placeholder="Conteudo da notícia"
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
