"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./CepSearch.module.css";

export default function CepSearch() {
  // Definindo estados para CEP, endereço, status de carregamento e erro
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Função para atualizar o estado do CEP
  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  // Função de busca do endereço com base no CEP
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAddress(null);

    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);

      // Verifica se o CEP é válido
      if (response.data.erro) {
        setError("CEP não encontrado");
      } else {
        setAddress(response.data); // Armazena os dados do endereço
      }
    } catch (err) {
      setError("Erro ao buscar endereço");
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
          maxLength={9}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={loading || cep.length < 8}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {address && !error && (
        <div className={styles.result}>
          <h3 className={styles.feedback}>Endereço Encontrado:</h3>
          <p>
            <strong>Logradouro:</strong> {address.logradouro}
          </p>
          <p>
            <strong>Bairro:</strong> {address.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {address.localidade}
          </p>
          <p>
            <strong>Estado:</strong> {address.uf}
          </p>
        </div>
      )}
    </div>
  );
  npm;
}
