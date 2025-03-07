import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Table } from "./table.component";
import { mockPosts } from "@/test-helpers/mock-posts";

const mockDeletePostById = vi.fn();
const mockSearchForPostByTitle = vi.fn();

vi.mock("./table.hook", () => ({
  useTable: () => ({
    filteredData: mockPosts,
    searchForPostByTitle: (searchTerm: string) =>
      mockSearchForPostByTitle(searchTerm),
    deletePostById: (id: number) => mockDeletePostById(id),
  }),
}));

describe("Table", () => {
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

  it("should searchForPostByTitle based on the search term", async () => {
    render(<Table />);

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "Test search" } });

    await waitFor(() => {
      expect(mockSearchForPostByTitle).toHaveBeenCalledWith("Test search");
    });
  });

  it("should call deletePost when delete button is clicked", async () => {
    render(<Table />);

    const deleteButtons = screen.getAllByRole("button");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockDeletePostById).toHaveBeenCalledWith(1);
    });
  });
});
