"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import classNames from "classnames";
import { useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { logout } from "../../store/features/userSlice";

export default function Nav() {
  const dispatch = useAppDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useAppSelector((state) => state.user.user);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={classNames(styles.mainNav, styles.nav)}>
      <div className={classNames(styles.navLogo, styles.logo)}>
        <Image
          alt="Логотип Skypro.Music"
          className={styles.logoImage}
          src="/img/logo.png"
          width={114}
          height={17}
        />
      </div>
      <div
        className={classNames(styles.navBurger, styles.burger)}
        onClick={toggleMenu}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isMenuOpen && (
        <div className={classNames(styles.navMenu, styles.menu)}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Главное
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Мой плейлист
              </a>
            </li>
            <li className={styles.menuItem}>
              {user ? (
                <div className={styles.menuLink} onClick={handleLogout}>
                  Выйти
                </div>
              ) : (
                <Link href="/signin" className={styles.menuLink}>
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
