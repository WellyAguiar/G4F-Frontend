"use client"
import React, { useState } from 'react';
import axios from 'axios';
import styles from './CepSearch.module.css';

export default function CepSearch() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
    } catch (err) {
      setError('Erro ao buscar endereço');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Buscar Endereço por CEP</h2>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={cep}
          onChange={handleCepChange}
          placeholder="Digite o CEP"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Buscar</button>
      </form>
      
      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      {address && (
        <div className={styles.result}>
          <h3>Endereço Encontrado:</h3>
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade:</strong> {address.localidade}</p>
          <p><strong>Estado:</strong> {address.uf}</p>
        </div>
      )}
    </div>
  );
}
