"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CepSearch from "./components/cepSearch/CepSearch";
import NewsCrud from "./components/news/NewsCrud";

export default function Home() {
  // Definindo o estado para a página selecionada (CEP ou Notícias)
  const [selectedPage, setSelectedPage] = useState("cep");

  return (
    <div className={styles.container}>
      <Header selectedPage={selectedPage} onToggle={setSelectedPage} />
      <main className={styles.mainContent}>
        {selectedPage === "cep" ? (
          <>
            <h1>Está buscando uma localização?</h1>
            <p className={styles.description}>
              Basta procurar através do campo de busca e clicar no botão
              "Buscar".
            </p>
            <CepSearch />
          </>
        ) : (
          <>
            <h1>Notícias</h1>
            <p className={styles.description}>
              Aqui você pode visualizar, criar, editar e excluir notícias.
            </p>
            <NewsCrud />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
