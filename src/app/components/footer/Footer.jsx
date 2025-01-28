// src/components/footer/Footer.jsx
import styles from "./Footer.module.css";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contacts}>
        <ul className={styles.contactList}>
          <li>
            <a href="mailto:wellyagui@gmail.com" className={styles.link}>
              <FaEnvelope size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/welly-aguiar/"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/wellyaguiar"
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>
          </li>
        </ul>
      </div>
      <p>&copy; 2025 Welly Aguiar. Todos os direitos reservados.</p>
    </footer>
  );
}
