// src/components/header/Header.jsx
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <h2>
        <Link href="/" className={styles.nameLink}>
          Welly Aguiar
        </Link>
      </h2>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link href="/news" className={styles.link}>
              Notícias
            </Link>
          </li>
          <li>
            <Link href="/páginaexemplo" className={styles.link}>
              Exemplo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
