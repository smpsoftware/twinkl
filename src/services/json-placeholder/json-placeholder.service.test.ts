import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchPosts, Post } from "./json-placeholder.service";
import { mockPosts } from "@/test-helpers/mock-posts";

const mockAxiosGet = vi.fn();

vi.mock("axios", () => ({
  default: {
    create: () => ({
      get: () => mockAxiosGet(),
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

      const received = await fetchPosts();

      expect(received).toEqual(expected);
    });

    it("should throw an error if axios rejects", async () => {
      mockAxiosGet.mockRejectedValue("an error occurred");
      expect(async () => await fetchPosts()).rejects.toThrowError(
        "an error occurred",
      );
    });
  });
});
