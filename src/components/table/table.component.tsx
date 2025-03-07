import { jsonPlaceholderService } from "@/services/json-placeholder";
import { useEffect, useState } from "react";

export const Table = () => {
  const [data, setData] = useState<jsonPlaceholderService.Post[]>([]);

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
      {data &&
        data.map((post) => (
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tr>
        ))}
    </table>
  );
};
