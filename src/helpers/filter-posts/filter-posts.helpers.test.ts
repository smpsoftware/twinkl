import { describe, expect, it } from "vitest";
import { filterPosts } from "./filter-posts.helper";
import { mockPosts } from "@/test-helpers/mock-posts";

describe("filterPosts", () => {
  it("should return a post that include the search term in itsq title", () => {
    const received = filterPosts("test title 1", mockPosts);

    const expected = mockPosts[0];

    expect([expected]).toEqual(received);
  });

  it("should return an array of posts that include the search term in their title", () => {
    const received = filterPosts("test title", mockPosts);

    const expected = mockPosts;

    expect(expected).toEqual(received);
  });
});
