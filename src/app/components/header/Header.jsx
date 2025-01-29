"use client";
import React from "react";
import styles from "./Header.module.css";

export default function Header({ selectedPage, onToggle }) {
  return (
    <header className={styles.header}>
      <h1 onClick={() => onToggle("cep")}>Welly Aguiar</h1>
      <nav>
        <button
          className={`${styles.toggleButton} ${selectedPage === "cep" ? styles.active : ""}`}
          onClick={() => onToggle("cep")}
        >
          Buscar CEP
        </button>
        <button
          className={`${styles.toggleButton} ${selectedPage === "news" ? styles.active : ""}`}
          onClick={() => onToggle("news")}
        >
          Notícias
        </button>
      </nav>
    </header>
  );
}
