import { afterEach, describe, expect, it, vi } from "vitest";
import { useTable } from "./table.hook";
import { renderHook, waitFor } from "@testing-library/react";
import { Post } from "@/services/json-placeholder/json-placeholder.service";
import { mockPosts } from "@/test-helpers/mock-posts";

const mockFetchPosts = vi.fn();
const mockDeletePost = vi.fn();
const mockFilterPosts = vi.fn();

vi.mock("@/helpers/filter-posts/filter-posts.helper", () => ({
  filterPosts: (searchTerm: string, posts: Post[]) =>
    mockFilterPosts(searchTerm, posts),
}));
vi.mock("@/services/json-placeholder", () => ({
  jsonPlaceholderService: {
    fetchPosts: () => mockFetchPosts(),
    deletePost: (id: number) => mockDeletePost(id),
  },
}));

describe("useTable", () => {
  beforeEach(() => {
    mockFetchPosts.mockResolvedValue(mockPosts);
    mockFilterPosts.mockReturnValue(mockPosts);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch data on load", () => {
    const { result } = renderHook(() => useTable());

    const { filteredData } = result.current;

    expect(filteredData).toEqual(mockPosts);
    expect(mockFetchPosts).toHaveBeenCalled();
  });

  it("should call deletePost", () => {
    const { result } = renderHook(() => useTable());

    const { deletePostById } = result.current;

    deletePostById(1);

    expect(mockDeletePost).toHaveBeenCalledWith(1);
  });

  it("should call filterPosts", async () => {
    const { result } = renderHook(() => useTable());

    const { searchForPostByTitle } = result.current;

    searchForPostByTitle("Test title 1");

    await waitFor(() => {
      expect(mockFilterPosts).toHaveBeenCalledWith("Test title 1", mockPosts);
    });
  });
});
