import { Wrapper } from "@/test/setup";
import { act, render } from "@testing-library/react";
import { Dashboard } from "./dashboard";
describe("App", () => {
  it("renders the Dashboard page", async () => {
    await act(async () => {
      render(
        <Wrapper>
          <Dashboard />
        </Wrapper>,
      );
    });
  });
});
