import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";
import Filter from "@/components/Filter/Filter";
import Playlist from "@/components/Playlist/Playlist";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterblock}>
            <Search />
            <h2 className={styles.centerblockTitle}>Треки</h2>
            <Filter />
            <Playlist />
          </div>
          <Sidebar />
        </main>
        <Bar />
      </div>
    </div>
  );
}
