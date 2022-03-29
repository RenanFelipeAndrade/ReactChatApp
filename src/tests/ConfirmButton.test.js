import { ConfirmButton } from "../components/Buttons/ConfirmButton";
import { render, screen } from "@testing-library/react";

test("render the default confirm button", () => {
  render(
    <ConfirmButton data-testid="default-confirm-button">
      Confirmar
    </ConfirmButton>
  );
  expect(screen.getByTestId("default-confirm-button")).toBeTruthy();
});

test("render the submit confirm button", () => {
  render(
    <ConfirmButton data-testid="confirm-button" submit={true}>
      Confirmar
    </ConfirmButton>
  );
  expect(screen.getByTestId("confirm-button")).toBeTruthy();
});
