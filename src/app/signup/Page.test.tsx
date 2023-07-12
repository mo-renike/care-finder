import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./page";

test("renders the login form", () => {
  // Render the component
  render(<Page />);

  // Find form elements
  const emailInput = screen.getByLabelText(/Email/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const loginButton = screen.getByRole("button", { name: /Login/i });

  // Assert the result
  expect(screen.getByText(/Login Successful/i)).toBeTruthy();
});
