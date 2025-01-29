import styles from "./../page.module.css";
import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";
import CepSearch from "./../components/cepSearch/CepSearch"; // Importando o componente

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Está buscando uma localização?</h1>
        <p className={styles.description}>
          Basta procurar através do campo de busca e clicar no botão "Buscar".
        </p>
        <CepSearch />
      </main>
      <Footer />
    </div>
  );
}
