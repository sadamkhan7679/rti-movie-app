// __tests__/components/header/header.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { Header } from "@/components/shared/header";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Header", () => {
  const mockBack = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: mockPush,
    });
  });

  it("should render title correctly", () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should show menu button by default", () => {
    render(<Header title="Test" />);
    expect(screen.getByLabelText("Menu")).toBeInTheDocument();
  });

  it("should hide menu button when showMenu is false", () => {
    render(<Header title="Test" showMenu={false} />);
    expect(screen.queryByLabelText("Menu")).not.toBeInTheDocument();
  });

  it("should show back button when showBackButton is true", () => {
    render(<Header title="Test" showBackButton={true} />);
    expect(screen.getByLabelText("Go back")).toBeInTheDocument();
  });

  it("should call router.back when back button is clicked", () => {
    render(<Header title="Test" showBackButton={true} />);

    const backButton = screen.getByLabelText("Go back");
    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("should not show back button by default", () => {
    render(<Header title="Test" />);
    expect(screen.queryByLabelText("Go back")).not.toBeInTheDocument();
  });

  it("should render both back button and menu when both are enabled", () => {
    render(<Header title="Test" showBackButton={true} showMenu={true} />);

    expect(screen.getByLabelText("Go back")).toBeInTheDocument();
    expect(screen.getByLabelText("Menu")).toBeInTheDocument();
  });
});
