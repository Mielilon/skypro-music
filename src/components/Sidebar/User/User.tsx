"use client";

import styles from "./User.module.css";
import { useAppSelector } from "@/hooks/store";
import Icon from "@/components/Icon/Icon";
import useInitializeLikedTracks from "../../../hooks/useInitializeLikedTracks";

export default function User() {
  useInitializeLikedTracks();

  const userName = useAppSelector((state) => state.user.user?.username);

  if (!userName) {
    return null;
  }

  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{userName}</p>
      <Icon
        name="logout"
        wrapperClass={styles.sidebarIcon}
        iconClass={styles.sidebarIconSvg}
      />
    </div>
  );
}
