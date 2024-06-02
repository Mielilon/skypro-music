import Image from "next/image";
import styles from "./Sidebar.module.css";
import classNames from "classnames";

const sidebarItems = [
  {
    id: 1,
    src: "/img/playlist01.png",
    alt: "Плейлист дня",
    href: "",
  },
  {
    id: 2,
    src: "/img/playlist02.png",
    alt: "100 танцевальных хитов",
    href: "#",
  },
  {
    id: 3,
    src: "/img/playlist03.png",
    alt: "Инди-заряд",
    href: "#",
  },
];

export default function Sidebar() {
  return (
    <div className={classNames(styles.mainSidebar, styles.sidebar)}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
        <div className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          {sidebarItems.map((item) => (
            <div key={item.id} className={styles.sidebarItem}>
              <a href={item.href} className={styles.sidebarLink}>
                <Image
                  className={styles.sidebarImg}
                  src={item.src}
                  alt={item.alt}
                  height={150}
                  width={250}
                  priority={true}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
