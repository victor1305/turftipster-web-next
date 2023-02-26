import RouterService from "@/lib/routerService";
import styles from "@/components/navbar/NavBar.module.scss";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

export default function NavBar() {

  const router = useRouter();

  return (
    <div>
      <nav className={styles.container}>
        <div>
          <Link href={RouterService.HOME_URL} className={styles["container--logo"]}>
            TurfTipster
          </Link>
        </div>
        <div className={styles["container__menu"]}>
          <p className={classNames({
              [styles["container__menu--active"]]: router.pathname.includes("carreras"),
            })}><Link href={RouterService.HORSE_RACING_URL}>Carreras de caballos</Link></p>
          <p className={classNames({
              [styles["container__menu--active"]]: router.pathname.includes("stats"),
            })}><Link href={RouterService.STATS_URL}>Stats</Link></p>
          <p className={classNames({
              [styles["container__menu--active"]]: router.pathname.includes("quienes-somos"),
            })}><Link href={RouterService.WHO_ARE_US_URL}>Quienes somos</Link></p>
        </div>
      </nav>
    </div>
  );
}