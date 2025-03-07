import { Post } from "@/services/json-placeholder/json-placeholder.service";

export const filterPosts = (searchTerm: string, posts: Post[]): Post[] => {
  return posts.filter(({ title }) => title.includes(searchTerm));
};
