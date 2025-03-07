import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Table } from "./table.component";
import { Post } from "@/services/json-placeholder/json-placeholder.service";

const mockFetchPosts = vi.fn();

vi.mock("@/services/json-placeholder", () => ({
  jsonPlaceholderService: {
    fetchPosts: () => mockFetchPosts(),
  },
}));

describe("Table", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render posts content", async () => {
    const mockPosts: Post[] = [
      { id: 1, body: "test body 1", title: "test title 1", userId: 1 },
      { id: 2, body: "test body 2", title: "test title 2", userId: 1 },
    ];
    mockFetchPosts.mockResolvedValue(mockPosts);

    render(<Table />);

    await waitFor(() => {
      mockPosts.forEach(({ body, title }) => {
        expect(screen.getByText(body)).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });
});
