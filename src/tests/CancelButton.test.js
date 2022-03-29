import { CancelButton } from "../components/Buttons/CancelButton";
import { render, screen } from "@testing-library/react";

test("render the cancel button", () => {
  render(
    <CancelButton data-testid="default-cancel-button">Cancelar</CancelButton>
  );
  expect(screen.getByTestId("default-cancel-button")).toBeTruthy();
});
