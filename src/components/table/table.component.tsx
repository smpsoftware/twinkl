import { useTable } from "./table.hook";
import * as styles from "./table.module.css";

export const Table = () => {
  const { filteredData, deletePostById, searchForPostByTitle } = useTable();

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={styles.searchWrapper}>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="string"
              onChange={(e) => searchForPostByTitle(e.target.value)}
            />
          </td>
        </tr>

        {filteredData &&
          filteredData.map((post) => (
            <tr key={post.id}>
              <td className={styles.tableContentWrapper}>
                <span className={styles.tableContentTitle}>{post.title}</span>
                <span className={styles.tableContentBody}>{post.body}</span>
              </td>
              <td>
                <button
                  role="button"
                  className={styles.deleteButton}
                  onClick={async () => await deletePostById(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
