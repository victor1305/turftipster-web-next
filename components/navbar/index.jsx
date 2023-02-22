import RouterService from "@/lib/routerService";
import styles from "@/components/navbar/NavBar.module.scss";
import Link from "next/link";

export default function NavBar() {
  return (
    <div>
      <nav className={styles.container}>
        <div className={styles.logo}>
          <Link href={RouterService.HOME_URL} className={styles["container--logo"]}>
            TurfTipster
          </Link>
        </div>
      </nav>
    </div>
  );
}