import { filterPosts } from "@/helpers/filter-posts/filter-posts.helper";
import { jsonPlaceholderService } from "@/services/json-placeholder";
import { useEffect, useState } from "react";

export const Table = () => {
  const [data, setData] = useState<jsonPlaceholderService.Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await jsonPlaceholderService.fetchPosts();

      if (result) {
        setData(result);
      }
    };
    fetchData();
  }, []);

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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </td>
      </tr>

      {data &&
        filterPosts(searchTerm, data).map((post) => (
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tr>
        ))}
    </table>
  );
};
