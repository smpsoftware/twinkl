import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Table } from "./table.component";
import { mockPosts } from "@/test-helpers/mock-posts";
import { Post } from "@/services/json-placeholder/json-placeholder.service";

const mockFetchPosts = vi.fn();
const mockFilterPosts = vi.fn();

vi.mock("@/helpers/filter-posts/filter-posts.helper", () => ({
  filterPosts: (searchTerm: string, posts: Post[]) =>
    mockFilterPosts(searchTerm, posts),
}));
vi.mock("@/services/json-placeholder", () => ({
  jsonPlaceholderService: {
    fetchPosts: () => mockFetchPosts(),
  },
}));

describe("Table", () => {
  beforeEach(() => {
    mockFetchPosts.mockResolvedValue(mockPosts);
    mockFilterPosts.mockReturnValue(mockPosts);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render posts content", async () => {
    render(<Table />);

    await waitFor(() => {
      mockPosts.forEach(({ body, title }) => {
        expect(screen.getByText(body)).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });

  it("should filter posts based on the search term", async () => {
    render(<Table />);

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "Test search" } });

    await waitFor(() => {
      expect(mockFilterPosts).toHaveBeenCalledWith("Test search", mockPosts);
    });
  });
});
