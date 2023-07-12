import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { AppContext } from "@/app/AppContext";
import { signOut } from "@/app/services/firebase/firebase";

const mockContextValues = {
  currentUser: {
    displayName: "John Doe",
    email: "johndoe@example.com",
    photoURL: "https://example.com/avatar.png",
  },
};

jest.mock("@/app/AppContext", () => ({
  AppContext: {
    Consumer: ({ children }: { children: (value: any) => React.ReactNode }) =>
      children(mockContextValues),
  },
}));

jest.mock("@/app/services/firebase/firebase", () => ({
  signOut: jest.fn(),
}));

describe("Navbar", () => {
  test("renders component without errors", () => {
    render(<Navbar />);
    expect(screen.getByText("CareFinder")).toBeTruthy();
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Find Hospitals")).toBeTruthy();
    // Add more assertions as needed
  });

  test("calls signOut function when logout button is clicked", () => {
    render(<Navbar />);
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
