import { useTable } from "./table.hook";

export const Table = () => {
  const { filteredData, deletePostById, searchForPostByTitle } = useTable();

  return (
    <table>
      <tr>
        <th>Item</th>
      </tr>
      <tr>
        <td>
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
            <td>{post.title}</td>
            <td>{post.body}</td>
            <td>
              <button
                role="button"
                onClick={async () => await deletePostById(post.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
    </table>
  );
};
