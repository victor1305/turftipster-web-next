import React, { useState } from "react";
import RouterService from "@/lib/routerService";
import styles from "@/components/navbar/NavBar.module.scss";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import { FiMenu, FiX } from "react-icons/fi";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }

  const openCloseMenu = () => {
    const body = document.querySelector("body");
    const gloHtml = document.querySelector("html");
    if (!open) {
      gloHtml.style.overflowY = "hidden";
      body.style.overflowY = "hidden";
      document.addEventListener("touchmove", preventDefault, false);
    } else {
      gloHtml.style.overflowY = "auto";
      body.style.overflowY = "auto";
      document.removeEventListener("touchmove", preventDefault, false);
    }

    setOpen(!open);
  };

  const closeMenu = () => {
    const body = document.querySelector("body");
    const gloHtml = document.querySelector("html");
    if (open) {
      gloHtml.style.overflowY = "auto";
      body.style.overflowY = "auto";
      document.removeEventListener("touchmove", preventDefault, false);
      setOpen(!open);
    }
  };

  return (
    <div>
      <nav className={styles.container}>
        <div className={styles["container--logo"]}>
          <Link href={RouterService.HOME_URL} onClick={closeMenu}>
            <img src="/logo.png" alt="logo" />
          </Link>
        </div>
        <div
          className={classNames([styles["container__menu"]], {
            [styles["container__menu--open"]]: open,
          })}
        >
          <p
            className={classNames({
              [styles["container__menu--active"]]: router.pathname.includes(
                "carreras"
              ),
            })}
          >
            <Link href={RouterService.HORSE_RACING_URL} onClick={closeMenu}>
              Carreras de caballos
            </Link>
          </p>
          <p
            className={classNames({
              [styles["container__menu--active"]]: router.pathname.includes(
                "stats"
              ),
            })}
          >
            <Link href={RouterService.STATS_URL} onClick={closeMenu}>
              Stats
            </Link>
          </p>
          <p
            className={classNames({
              [styles["container__menu--active"]]: router.pathname.includes(
                "quienes-somos"
              ),
            })}
          >
            <Link href={RouterService.WHO_ARE_US_URL} onClick={closeMenu}>
              Quienes somos
            </Link>
          </p>
        </div>
        <div className={styles["container__burger"]}>
          {open ? (
            <FiX onClick={openCloseMenu} />
          ) : (
            <FiMenu onClick={openCloseMenu} />
          )}
        </div>
      </nav>
    </div>
  );
}
