import Image from "next/image";
import styles from "./Nav.module.css";
import classNames from "classnames";

export default function Nav() {
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
      <div className={classNames(styles.navBurger, styles.burger)}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
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
            <a href="../signin.html" className={styles.menuLink}>
              Войти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}