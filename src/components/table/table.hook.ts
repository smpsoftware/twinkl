import { filterPosts } from "@/helpers/filter-posts/filter-posts.helper";
import { jsonPlaceholderService } from "@/services/json-placeholder";
import { useState, useEffect } from "react";

interface TableState {
  filteredData: jsonPlaceholderService.Post[];
  deletePostById: (id: number) => Promise<void>;
  searchForPostByTitle: (postTitle: string) => void;
}

export const useTable = (): TableState => {
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

  const deletePostById = async (id: number) => {
    await jsonPlaceholderService.deletePost(id);
  };

  const searchForPostByTitle = (postTile: string) => {
    setSearchTerm(postTile);
  };

  const filteredData = filterPosts(searchTerm, data);

  return {
    filteredData,
    deletePostById,
    searchForPostByTitle,
  };
};
