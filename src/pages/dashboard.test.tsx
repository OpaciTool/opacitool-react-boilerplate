import { toNumericDateString } from "@/helpers";
import { server, Wrapper } from "@/test/setup";
import { act, render, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import { Dashboard } from "./dashboard";
import { delay, http, HttpResponse } from "msw";
import { MOCK_OBSERVATIONS } from "@/test/mock";
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

  it("renders the Dashboard page with Observations", async () => {
    await act(async () => {
      render(
        <Wrapper>
          <Dashboard />
        </Wrapper>,
      );
    });

    // Check for 2 observations
    await waitFor(() => {
      const observationRows = screen.getAllByTestId("observation-row");
      expect(observationRows).toHaveLength(2);

      // Check for observation data
      const row1 = observationRows[0];
      expect(row1).toHaveTextContent(MOCK_OBSERVATIONS[0].facility_name!);
      expect(row1).toHaveTextContent(
        toNumericDateString(MOCK_OBSERVATIONS[0].observation_date!),
      );
      expect(row1).toHaveTextContent(MOCK_OBSERVATIONS[0].type!);

      const row2 = observationRows[1];
      expect(row2).toHaveTextContent(MOCK_OBSERVATIONS[1].facility_name!);
      expect(row2).toHaveTextContent(
        toNumericDateString(MOCK_OBSERVATIONS[1].observation_date!),
      );
      expect(row2).toHaveTextContent(MOCK_OBSERVATIONS[1].type!);
    });
  });

  it("renders the Dashboard page with an active Subscription", async () => {
    server.use(
      http.get("/users/me/subscription", async () => {
        await delay();
        return HttpResponse.json({
          status: "active",
          currentPeriodEnd: 1630454400, // 2021-09-01
        });
      }),
    );
    await act(async () => {
      render(
        <Wrapper>
          <Dashboard />
        </Wrapper>,
      );
    });

    // Check for subscription status
    await waitFor(() => {
      const subscriptionStatus = screen.getByTestId("subscription-status");
      expect(subscriptionStatus).toHaveTextContent("active");
    });
  });

  it("renders the Dashboard page with a paused Subscription", async () => {
    server.use(
      http.get("/users/me/subscription", async () => {
        await delay();
        return HttpResponse.json({
          status: "paused",
          currentPeriodEnd: 1630454400, // 2021-09-01
        });
      }),
    );
    await act(async () => {
      render(
        <Wrapper>
          <Dashboard />
        </Wrapper>,
      );
    });

    await waitFor(() => {
      const subscriptionStatus = screen.getByTestId("subscription-status");
      expect(subscriptionStatus).toHaveTextContent("paused");
    });
  });

  it("renders the Dashboard page with an inactive Subscription", async () => {
    server.use(
      http.get("/users/me/subscription", async () => {
        await delay();
        return HttpResponse.json({
          status: "inactive",
          currentPeriodEnd: 1630454400, // 2021-09-01
        });
      }),
    );
    await act(async () => {
      render(
        <Wrapper>
          <Dashboard />
        </Wrapper>,
      );
    });

    await waitFor(() => {
      const subscriptionStatus = screen.getByTestId("subscription-status");
      expect(subscriptionStatus).toHaveTextContent("inactive");
    });
  });
});
