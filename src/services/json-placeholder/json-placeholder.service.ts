import axios from "axios";

const jsonPlaceholderService = axios.create({
  baseURL: process.env.REACT_APP_JSON_PLACEHOLDER_URL,
});

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await jsonPlaceholderService.get("/posts");
    return response.data;
  } catch (error) {
    throw new Error("an error occurred");
  }
};
