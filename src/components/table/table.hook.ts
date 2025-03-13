import { filterPosts } from "@/helpers/filter-posts/filter-posts.helper";
import { jsonPlaceholderService } from "@/services/json-placeholder";
import { useState, useEffect, useMemo } from "react";

interface TableState {
  filteredData: jsonPlaceholderService.Post[];
  deletePostById: (id: number) => Promise<void>;
  searchForPostByTitle: (postTitle: string) => void;
  selectNextPage: () => void,
  selectPreviousPage: () => void
  currentPage: number
  totalPages: number
}

export const useTable = (): TableState => {
  const [data, setData] = useState<jsonPlaceholderService.Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(1)


  useEffect(() => {
    //local storage 
    const fetchData = async () => {
      setLoading(true)
      const result = await useMemo(async () => await jsonPlaceholderService.fetchPosts(currentPage), [currentPage]) 

      if (result) {
        setData(result.posts);
        setTotalPages(result.totalPages)
      }
    };
    fetchData();
  }, [currentPage]);

  const deletePostById = async (id: number) => {
    await jsonPlaceholderService.deletePost(id);
  };

  const searchForPostByTitle = (postTile: string) => {
    setSearchTerm(postTile);
  };

  const selectNextPage = () => {
    if(currentPage < totalPages) setCurrentPage((state) => state + 1)
    }

  const selectPreviousPage = () => {
    if(currentPage > 1)  setCurrentPage((state) => state - 1)
  }

  const filteredData = filterPosts(searchTerm, data);

  return {
    filteredData,
    deletePostById,
    searchForPostByTitle,
    selectNextPage,
    selectPreviousPage,
    currentPage,
    totalPages
  };
};
