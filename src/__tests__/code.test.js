import { render, screen, fireEvent } from "@testing-library/react";
import MainIndex from "../components/mainindex";

describe("MainIndex", () => {
  test("should render verification code input fields", () => {
    render(<MainIndex />);
    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields).toHaveLength(6);
  });
});
