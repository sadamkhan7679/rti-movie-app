import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorMessage } from "@/components/shared/error-message";

describe("ErrorMessage", () => {
  it("should render default error message", () => {
    render(<ErrorMessage />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("should render custom error message", () => {
    render(<ErrorMessage message="Custom error occurred" />);

    expect(screen.getByText("Custom error occurred")).toBeInTheDocument();
  });

  it("should render retry button when onRetry is provided", () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage onRetry={mockRetry} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("should not render retry button when onRetry is not provided", () => {
    render(<ErrorMessage />);

    const retryButton = screen.queryByRole("button", { name: /retry/i });
    expect(retryButton).not.toBeInTheDocument();
  });

  it("should call onRetry when retry button is clicked", () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage onRetry={mockRetry} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    fireEvent.click(retryButton);

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("should call onRetry multiple times when clicked multiple times", () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage onRetry={mockRetry} />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    fireEvent.click(retryButton);
    fireEvent.click(retryButton);
    fireEvent.click(retryButton);

    expect(mockRetry).toHaveBeenCalledTimes(3);
  });

  it("should display error icon", () => {
    const { container } = render(<ErrorMessage />);

    const icon = container.querySelector('[class*="icon"]');
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe("⚠️");
  });

  it("should render with proper container structure", () => {
    const { container } = render(<ErrorMessage message="Test error" />);

    const containerEl = container.querySelector('[class*="container"]');
    expect(containerEl).toBeInTheDocument();
  });

  it("should render message with correct styling class", () => {
    const { container } = render(<ErrorMessage message="Styled message" />);

    const message = container.querySelector('[class*="message"]');
    expect(message).toBeInTheDocument();
    expect(message?.textContent).toBe("Styled message");
  });
});
