import React from "react";
import { render, screen } from "@testing-library/react";
import HospitalsList from "./HospitalsList";

test("renders HospitalsList component", () => {
  render(<HospitalsList />);

  expect(screen.getByText(/HospitalsList/i)).toContain("Fetured Hospitals");
  expect(screen.getByLabelText("Enter location")).toBeTruthy();
});
