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

interface FetchPostsResponse {
  totalPages: number
  posts: Post[]
}
//?_start=x

//?_page=1

export const fetchPosts = async (page: number, postsPerPage = 10): Promise<FetchPostsResponse> => {
  try {
    const response = await jsonPlaceholderService.get(`/posts?_page=${page}&post_per_page=${postsPerPage}`);
    const headers = response.headers

    const totalPosts = headers['x-total-count']

    const totalPages = Math.ceil(totalPosts / postsPerPage)

    return {
      totalPages,
      posts: response.data
    };
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
