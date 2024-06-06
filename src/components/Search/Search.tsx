import Icon from "../Icon/Icon";
import styles from "./Search.module.css";
import classNames from "classnames";

export default function Search() {
  return (
    <div className={classNames(styles.centerblockSearch, styles.search)}>
      <Icon name="search" iconClass={styles.searchSvg} />
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
}
