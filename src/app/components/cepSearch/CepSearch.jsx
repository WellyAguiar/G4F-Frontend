"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./CepSearch.module.css";

export default function CepSearch() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAddress(null); // Limpa o endereço anterior antes de fazer a nova busca

    try {
      const response = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);

      // Verifica se os dados da resposta são válidos
      if (response.data.erro) {
        setError("CEP não encontrado");
      } else {
        setAddress(response.data);
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
