import styles from "@/components/footer/Footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["footer-container__rrss"]}>
        <span>info@turftipster.com</span>
        <a href="https://www.twitter.com/turftipster" target="_blank" rel="noopener noreferrer"><img src="/twitter.png" alt="Twitter logo" /></a>
        <a href="https://www.telegram.me/turftipster" target="_blank" rel="noopener noreferrer"><img src="/telegram.png" alt="Telegram logo" /></a>
      </div>
      <div className={styles["footer-container__copy"]}>
        <span>Turftipster © {year}</span>
      </div>
    </div>
  )
}