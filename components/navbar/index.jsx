import React, { useState } from 'react';
import RouterService from "@/lib/routerService";
import styles from "@/components/navbar/NavBar.module.scss";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import { FiMenu, FiX } from 'react-icons/fi';

export default function NavBar() {

  const [ open, setOpen ] = useState(false)
  const router = useRouter();

  return (
    <div>
      <nav className={styles.container}>
        <div className={styles["container--logo"]}>
          <Link href={RouterService.HOME_URL}>
            <img src="/logo.png" alt="logo" />
          </Link>
        </div>
        <div className={classNames([styles["container__menu"]],{
              [styles["container__menu--open"]]: open,
            })}>
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
        <div className={styles["container__burger"]}>
          {open ? <FiX onClick={() => setOpen(!open)} /> : <FiMenu onClick={() => setOpen(!open)} />}
        </div>
      </nav>
    </div>
  );
}