import { afterEach, describe, expect, it, vi } from "vitest";
import { deletePost, fetchPosts, Post } from "./json-placeholder.service";
import { mockPosts } from "@/test-helpers/mock-posts";

const mockAxiosGet = vi.fn();
const mockAxiosDelete = vi.fn();

vi.mock("axios", () => ({
  default: {
    create: () => ({
      get: () => mockAxiosGet(),
      delete: () => mockAxiosDelete(),
    }),
  },
}));

describe("jsonPlaceholderService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("fetchPosts", () => {
    it("should return posts if axios resolves", async () => {
      const expected: Post[] = mockPosts;

      mockAxiosGet.mockResolvedValue({ data: expected });

      const received = await fetchPosts(1);

      expect(received).toEqual(expected);
    });

    it("should throw an error if axios rejects", async () => {
      mockAxiosGet.mockRejectedValue("an error occurred");
      expect(async () => await fetchPosts(1)).rejects.toThrowError(
        "an error occurred",
      );
    });
  });

  describe("deletePost", () => {
    it("should return 'post deleted' if axios resolves", async () => {
      mockAxiosDelete.mockResolvedValue({});

      const received = await deletePost(1);

      expect(received).toEqual("post deleted");
    });

    it("should throw an error if axios rejects", async () => {
      mockAxiosDelete.mockRejectedValue("an error occurred");
      expect(async () => await deletePost(1)).rejects.toThrowError(
        "an error occurred",
      );
    });
  });
});
