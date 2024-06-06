import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";
import FilterList from "@/components/FilterList/FilterList";
import Playlist from "@/components/Playlist/Playlist";
import Sidebar from "@/components/Sidebar/Sidebar";
import Bar from "@/components/Bar/Bar";

import styles from "./page.module.css";
import { TrackListType } from "../types/tracks";
import { getTracks } from "../api/tracks";
import { CurrentTrackProvider } from "../contexts/CurrentTrackProvider";

export default async function Home() {
  let tracks: TrackListType = [];
  let error: string | null = null;

  try {
    tracks = await getTracks();
  } catch (err: unknown) {
    error =
      err instanceof Error
        ? "Ошибка при загрузке треков. " + err.message
        : "Неизвестная ошибка";
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <CurrentTrackProvider>
          <main className={styles.main}>
            <Nav />
            <div className={styles.mainCenterblock}>
              <Search />
              <h2 className={styles.centerblockTitle}>Треки</h2>
              <FilterList tracks={tracks} />
              <Playlist tracks={tracks} error={error} />
            </div>
            <Sidebar />
          </main>
          <Bar />
        </CurrentTrackProvider>
      </div>
    </div>
  );
}
