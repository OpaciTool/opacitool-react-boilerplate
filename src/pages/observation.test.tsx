import {
  MOCK_OBSERVATION_PAUSES,
  MOCK_OBSERVATIONS,
  MOCK_USER_DEVICE,
} from "@/test/mock";
import { Wrapper } from "@/test/setup";
import { act, render, screen, within } from "@testing-library/react";
import { ObservationPage } from "./observation";

describe("Observation", () => {
  it("renders the Observation page", async () => {
    await act(async () => {
      render(
        <Wrapper initialEntries={["/observations/:observationId"]}>
          <ObservationPage />
        </Wrapper>,
      );
    });
  });

  it("renders the Observation page with an observation with complete data", async () => {
    await act(async () => {
      render(
        <Wrapper initialEntries={[`/observations/${MOCK_OBSERVATIONS[0].uid}`]}>
          <ObservationPage />
        </Wrapper>,
      );
    });

    // Page Header
    await screen.findByText(MOCK_OBSERVATIONS[0].uid, { exact: false });

    // Form fields
    await screen.findByDisplayValue(MOCK_OBSERVATIONS[0].facility_name!);

    // Device Card
    const card = await screen.findByTestId("device-card");
    const descriptionList = card.querySelector("dl");
    expect(descriptionList).not.toBeNull();

    const platformRow = await within(card).findByText("Platform");
    expect(platformRow).not.toBeNull();
    expect(platformRow.nextSibling?.textContent).toBe(
      MOCK_USER_DEVICE.platform,
    );

    const modelRow = await within(card).findByText("Model");
    expect(modelRow).not.toBeNull();
    expect(modelRow.nextSibling?.textContent).toBe(MOCK_USER_DEVICE.model);

    const cameraRow = await within(card).findByText("Camera");
    expect(cameraRow).not.toBeNull();
    expect(cameraRow.nextSibling?.textContent).toBe(MOCK_USER_DEVICE.camera);

    // Readings
    const readings = await screen.findByTestId("observation-reading-stats");
    const statsContainer = within(readings).getByTestId("observation-stats");
    expect(statsContainer).not.toBeNull();
    const stats = within(statsContainer).getAllByRole("listitem");
    expect(stats).toHaveLength(4);

    // Stats
    const observationDate = stats[0];
    expect(observationDate.children[1].children[1].textContent).toBe(
      "07/28/2024",
    );
    const startTime = stats[1];
    expect(startTime.children[1].children[1].textContent).toBe("10:00:00");
    const endTime = stats[2];
    expect(endTime.children[1].children[1].textContent).toBe("11:00:00");
    const frequency = stats[3];
    expect(frequency.children[1].children[1].textContent).toBe("15 seconds");

    // Pauses
    const pauses = await screen.findByTestId("observation-pauses");
    const pauseList = await within(pauses).findByRole("list");
    const pauseItems = within(pauseList).getAllByRole("listitem");
    expect(pauseItems).toHaveLength(MOCK_OBSERVATION_PAUSES.length);
  });
});
