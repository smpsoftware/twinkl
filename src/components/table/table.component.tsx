import { useTable } from "./table.hook";
import * as styles from "./table.module.css";

export const Table = () => {
  const { filteredData, deletePostById, searchForPostByTitle } = useTable();

  return (
    <div className={styles.table}>
      <div className={styles.searchWrapper}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="string"
          onChange={(e) => searchForPostByTitle(e.target.value)}
        />
      </div>
      {filteredData &&
        filteredData.map((post) => (
          <div key={post.id} className={styles.postWrapper}>
            <div className={styles.postContentWrapper}>
              <span className={styles.postContentTitle}>{post.title}</span>
              <span className={styles.postContentBody}>{post.body}</span>
            </div>
            <div className={styles.buttonWrapper}>
              <button
                role="button"
                className={styles.deleteButton}
                onClick={async () => await deletePostById(post.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
