import axios from "axios";

const jsonPlaceholderService = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
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

export const deletePost = async (postId: number) => {
  try {
    await jsonPlaceholderService.delete(`/posts/${postId}`);
    return "post deleted";
  } catch (error) {
    throw new Error("an error occurred");
  }
};
