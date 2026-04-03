import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import App from "./App";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

test("renders upload prompt", () => {
  const { container } = render(<App />);
  const input = container.querySelector('input[type="file"]');
  expect(input).toBeInTheDocument();
});

test("calls predict endpoint and shows response", async () => {
  axios.post.mockResolvedValueOnce({
    data: { class: "Early Blight", confidence: 0.9234 },
  });

  const { container } = render(<App />);
  const input = container.querySelector('input[type="file"]');
  const file = new File(["leaf"], "leaf.png", { type: "image/png" });

  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringMatching(/\/predict$/),
      expect.any(FormData),
      expect.objectContaining({
        headers: { "Content-Type": "multipart/form-data" },
      }),
    );
  });

  expect(await screen.findByText(/early blight/i)).toBeInTheDocument();
  expect(screen.getByText("92.34%")).toBeInTheDocument();
});

test("shows backend error on request failure", async () => {
  axios.post.mockRejectedValueOnce({
    response: { data: { message: "backend unavailable" } },
  });

  const { container } = render(<App />);
  const input = container.querySelector('input[type="file"]');
  const file = new File(["leaf"], "leaf.png", { type: "image/png" });

  fireEvent.change(input, { target: { files: [file] } });

  expect(await screen.findByText(/backend unavailable/i)).toBeInTheDocument();
});

test("clear button resets selected state", async () => {
  axios.post.mockResolvedValueOnce({
    data: { class: "Healthy", confidence: 0.98 },
  });

  const { container } = render(<App />);
  const input = container.querySelector('input[type="file"]');
  const file = new File(["leaf"], "leaf.png", { type: "image/png" });

  fireEvent.change(input, { target: { files: [file] } });
  expect(await screen.findByText(/healthy/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /clear/i }));

  await waitFor(() => {
    expect(screen.queryByText(/healthy/i)).not.toBeInTheDocument();
  });
});
