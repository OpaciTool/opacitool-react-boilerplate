import { ObservationReading } from "@/shared/model";
import { MOCK_OBSERVATIONS } from "@/test/mock";
import { server, Wrapper } from "@/test/setup";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { ReferenceObservation } from "./ReferenceObservation";

async function clearAndEnterValue(input: HTMLElement, value: string) {
  await userEvent.click(input);
  await userEvent.clear(input);
  await userEvent.type(input, value);
}

const TEST_OBSERVATION = MOCK_OBSERVATIONS[1];

describe("ReferenceObservation", () => {
  beforeEach(async () => {
    let READINGS_CACHE: ObservationReading[] = [];

    server.use(
      http.get("/users/:id/observations/:observationUID", async () => {
        return HttpResponse.json({
          ...TEST_OBSERVATION,
        });
      }),
    );
    server.use(
      http.get(
        "/users/:userUID/observations/:observationUID/readings",
        async () => {
          return HttpResponse.json(READINGS_CACHE);
        },
      ),
    );
    server.use(
      http.get(
        "/users/:userUID/observations/:observationUID/screenshots",
        async () => {
          return HttpResponse.json([]);
        },
      ),
    );
    server.use(
      http.post(
        "/users/:userUID/observations/:observationUID/readings",
        async ({ request }) => {
          const { opacity, index } = (await request.json()) as {
            opacity: string;
            index: number;
          };
          READINGS_CACHE = [
            ...READINGS_CACHE,
            {
              created_at: new Date().toISOString(),
              id: READINGS_CACHE.length + 1,
              modified_at: new Date().toISOString(),
              observation_id: TEST_OBSERVATION.id,
              opacity: parseFloat(opacity),
              sort_order: index + 1 * 1000,
            },
          ];
          return new HttpResponse(null, { status: 201 });
        },
      ),
    );

    await act(async () => {
      render(
        <Wrapper initialEntries={[`/observations/${TEST_OBSERVATION.uid}`]}>
          <ReferenceObservation />
        </Wrapper>,
      );
    });
  });

  it("renders a reference Observation", async () => {
    // Page Header
    await screen.findByText(TEST_OBSERVATION.uid, { exact: false });
  });

  it("can edit and save it's date, start and end time via the form", async () => {
    server.use(
      http.patch("/users/:userUID/observations/:observationUID", async () => {
        return new HttpResponse(null, { status: 200 });
      }),
    );

    const container = await screen.findByTestId("observation-reading-stats");

    // Observation Date
    const observationDateInput =
      within(container).getByLabelText("observation date");
    await clearAndEnterValue(observationDateInput, "2024-10-23");

    // Start Time
    const startTimeInput = within(container).getByLabelText("start time");
    await clearAndEnterValue(startTimeInput, "12:00");

    // End Time
    const endTimeInput = within(container).getByLabelText("end time");
    await clearAndEnterValue(endTimeInput, "13:00");

    // Submit the form
    const submitButton = screen.getByText("Save Changes");
    await userEvent.click(submitButton);

    // Check for success message
    await screen.findByText("Observation updated successfully");
  });

  it("can be edited and saved via the form", async () => {
    server.use(
      http.patch("/users/:userUID/observations/:observationUID", async () => {
        return new HttpResponse(null, { status: 200 });
      }),
    );

    // Page Header
    await screen.findByText(TEST_OBSERVATION.uid, { exact: false });

    // Get the forms
    const formCards = screen.getAllByRole("form");
    expect(formCards).toHaveLength(5);

    // Fill out the Facility Info form
    const facilityInfoForm = formCards[0];
    const facilityInfoInputs = facilityInfoForm.getElementsByTagName("input");
    expect(facilityInfoInputs).toHaveLength(9);

    // Facility Name
    await clearAndEnterValue(facilityInfoInputs[0], "Test Facility Name");
    expect(facilityInfoInputs[0]).toHaveValue("Test Facility Name");

    // Permit Number
    await clearAndEnterValue(facilityInfoInputs[1], "Test Permit Number");
    expect(facilityInfoInputs[1]).toHaveValue("Test Permit Number");

    // Facility Address
    await clearAndEnterValue(facilityInfoInputs[2], "Test Facility Address");
    expect(facilityInfoInputs[2]).toHaveValue("Test Facility Address");

    // Facility Contact Name
    await clearAndEnterValue(
      facilityInfoInputs[3],
      "Test Facility Contact Name",
    );
    expect(facilityInfoInputs[3]).toHaveValue("Test Facility Contact Name");

    // Facility Contact Phone
    await clearAndEnterValue(facilityInfoInputs[4], "555-555-5555");
    expect(facilityInfoInputs[4]).toHaveValue("555-555-5555");

    // Process Equipment ID
    await clearAndEnterValue(
      facilityInfoInputs[5],
      "Test Process Equipment ID",
    );
    expect(facilityInfoInputs[5]).toHaveValue("Test Process Equipment ID");

    // Process Equipment Operating Mode
    await clearAndEnterValue(
      facilityInfoInputs[6],
      "Test Process Equipment Operating Mode",
    );
    expect(facilityInfoInputs[6]).toHaveValue(
      "Test Process Equipment Operating Mode",
    );

    // Control Equipment ID
    await clearAndEnterValue(
      facilityInfoInputs[7],
      "Test Control Equipment ID",
    );
    expect(facilityInfoInputs[7]).toHaveValue("Test Control Equipment ID");

    // Control Equipment Operating Mode
    await userEvent.click(facilityInfoInputs[8]);
    await userEvent.clear(facilityInfoInputs[8]);
    await userEvent.type(
      facilityInfoInputs[8],
      "Test Control Equipment Operating Mode",
    );
    expect(facilityInfoInputs[8]).toHaveValue(
      "Test Control Equipment Operating Mode",
    );

    // Fill out the Observation Point & Plume Information form
    const pointAndPlumeInfoForm = formCards[1];
    const pointAndPlumeInfoInputs =
      pointAndPlumeInfoForm.getElementsByTagName("input");

    // Latitude
    await clearAndEnterValue(pointAndPlumeInfoInputs[0], "0");
    expect(pointAndPlumeInfoInputs[0]).toHaveValue("0");

    // Longitude
    await clearAndEnterValue(pointAndPlumeInfoInputs[1], "0");
    expect(pointAndPlumeInfoInputs[1]).toHaveValue("0");

    // Height Relative to Observer
    await clearAndEnterValue(pointAndPlumeInfoInputs[2], "0");
    expect(pointAndPlumeInfoInputs[2]).toHaveValue("0");

    // Distance Relative to Observer
    await clearAndEnterValue(pointAndPlumeInfoInputs[3], "0");
    expect(pointAndPlumeInfoInputs[3]).toHaveValue("0");

    // Viewing Angle
    await clearAndEnterValue(pointAndPlumeInfoInputs[4], "0");
    expect(pointAndPlumeInfoInputs[4]).toHaveValue("0");

    // Direction from Observer
    await clearAndEnterValue(pointAndPlumeInfoInputs[5], "0");
    expect(pointAndPlumeInfoInputs[5]).toHaveValue("0");

    // Plume Shape
    const plumeShapeSelect =
      pointAndPlumeInfoForm.getElementsByTagName("select")[0];
    await userEvent.selectOptions(plumeShapeSelect, ["Fumigating"]);
    expect(plumeShapeSelect).toHaveValue("fumigating");

    // Emission Type (Radio)
    const emissionTypePlumeRadioField = pointAndPlumeInfoForm.querySelectorAll(
      "div[data-slot='control']",
    )[0];
    const emissionTypePlumeRadioOptions =
      emissionTypePlumeRadioField.querySelectorAll("div[data-slot='field']");
    expect(emissionTypePlumeRadioOptions).toHaveLength(3);
    await userEvent.click(
      emissionTypePlumeRadioOptions[2].querySelector("span")!,
    );
    const control = emissionTypePlumeRadioOptions[2].querySelector(
      "span[data-slot='control']",
    );
    expect(control).toHaveAttribute("data-checked");

    // Emission Color
    await clearAndEnterValue(pointAndPlumeInfoInputs[6], "Test Emission Color");
    expect(pointAndPlumeInfoInputs[6]).toHaveValue("Test Emission Color");

    // Water Vapor Plume (Radio)
    const waterVaporPlumeRadioField = pointAndPlumeInfoForm.querySelectorAll(
      "div[data-slot='control']",
    )[1];
    const waterVaporPlumeRadioOptions =
      waterVaporPlumeRadioField.querySelectorAll("div[data-slot='field']");
    expect(waterVaporPlumeRadioOptions).toHaveLength(3);
    await userEvent.click(
      waterVaporPlumeRadioOptions[1].querySelector("span")!,
    );
    const waterVaporControl = waterVaporPlumeRadioOptions[1].querySelector(
      "span[data-slot='control']",
    );
    expect(waterVaporControl).toHaveAttribute("data-checked");

    // Fill out the Atmospheric Data form
    const atmosphericDataForm = formCards[2];
    const atmosphericDataInputs =
      atmosphericDataForm.getElementsByTagName("input");

    // Percent Cloud Cover Start
    await clearAndEnterValue(atmosphericDataInputs[0], "0");
    expect(atmosphericDataInputs[0]).toHaveValue("0");

    // Percent Cloud Cover End
    await clearAndEnterValue(atmosphericDataInputs[1], "0");
    expect(atmosphericDataInputs[1]).toHaveValue("0");

    // Ambient Temperature Start
    await clearAndEnterValue(atmosphericDataInputs[2], "0");
    expect(atmosphericDataInputs[2]).toHaveValue("0");

    // Ambient Temperature End
    await clearAndEnterValue(atmosphericDataInputs[3], "0");
    expect(atmosphericDataInputs[3]).toHaveValue("0");

    // Wind Speed Start
    await clearAndEnterValue(atmosphericDataInputs[4], "0");
    expect(atmosphericDataInputs[4]).toHaveValue("0");

    // Wind Speed End
    await clearAndEnterValue(atmosphericDataInputs[5], "0");
    expect(atmosphericDataInputs[5]).toHaveValue("0");

    // Wind Direction Start
    await clearAndEnterValue(atmosphericDataInputs[6], "0");
    expect(atmosphericDataInputs[6]).toHaveValue("0");

    // Wind Direction End
    await clearAndEnterValue(atmosphericDataInputs[7], "0");
    expect(atmosphericDataInputs[7]).toHaveValue("0");

    // Relative Humidity Start
    await clearAndEnterValue(atmosphericDataInputs[8], "0");
    expect(atmosphericDataInputs[8]).toHaveValue("0");

    // Relative Humidity End
    await clearAndEnterValue(atmosphericDataInputs[9], "0");
    expect(atmosphericDataInputs[9]).toHaveValue("0");

    // Wet Bulb Temperature Start
    await clearAndEnterValue(atmosphericDataInputs[10], "0");
    expect(atmosphericDataInputs[10]).toHaveValue("0");

    // Wet Bulb Temperature End
    await clearAndEnterValue(atmosphericDataInputs[11], "0");
    expect(atmosphericDataInputs[11]).toHaveValue("0");

    // Fill out the Observer Information form
    const observerInfoForm = formCards[3];
    const observerInfoInputs = observerInfoForm.getElementsByTagName("input");

    // Observer Name
    await clearAndEnterValue(observerInfoInputs[0], "Test Observer Name");
    expect(observerInfoInputs[0]).toHaveValue("Test Observer Name");

    // Observer Company
    await clearAndEnterValue(observerInfoInputs[1], "Test Observer Company");
    expect(observerInfoInputs[1]).toHaveValue("Test Observer Company");

    // Certification Issued By
    await clearAndEnterValue(
      observerInfoInputs[2],
      "Test Certification Issued By",
    );
    expect(observerInfoInputs[2]).toHaveValue("Test Certification Issued By");

    // Certification Date
    await clearAndEnterValue(observerInfoInputs[3], "2024-10-23");
    expect(observerInfoInputs[3]).toHaveValue("2024-10-23");

    // Fill out the Comments form
    const commentsForm = formCards[4];
    const commentsInputs = commentsForm.getElementsByTagName("textarea");

    // Comments
    await clearAndEnterValue(commentsInputs[0], "Test Comments");
    expect(commentsInputs[0]).toHaveValue("Test Comments");

    // Submit the form
    const submitButton = screen.getByText("Save Changes");
    await userEvent.click(submitButton);

    // Check for success message
    await screen.findByText("Observation updated successfully");
  });

  it("can create a new reading", async () => {
    await screen.findByTestId("observation-reading-grid");
    const addButton = screen.getByLabelText("add new reading");
    await userEvent.click(addButton);
    expect(await screen.findByLabelText("reading 1 of 1")).toBeInTheDocument();
  });

  it("can highlight the cards that are within highest average range", async () => {
    const addButton = await screen.findByLabelText("add new reading");
    // Create 4 readings with an opacity of 50
    for (let i = 0; i < 4; i++) {
      await userEvent.click(addButton);
      const card = await screen.findByLabelText(`reading ${i + 1} of`, {
        exact: false,
      });
      await userEvent.click(card);
      await userEvent.keyboard("50");
      await userEvent.keyboard("{enter}");
    }

    // Create 4 readings with an opacity of 100
    for (let i = 0; i < 4; i++) {
      await userEvent.click(addButton);
      const card = await screen.findByLabelText(`reading ${i + 5} of`, {
        exact: false,
      });
      await userEvent.click(card);
      await userEvent.keyboard("100");
      await userEvent.keyboard("{enter}");
    }

    // Create 4 readings with an opacity of 75
    for (let i = 0; i < 4; i++) {
      await userEvent.click(addButton);
      const card = await screen.findByLabelText(`reading ${i + 9} of`, {
        exact: false,
      });
      await userEvent.click(card);
      await userEvent.keyboard("75");
      await userEvent.keyboard("{enter}");
    }

    // Set the averaging period to 5
    await userEvent.click(screen.getByTestId("averaging-period-select"));
    await userEvent.selectOptions(
      await screen.findByTestId("averaging-period-select"),
      ["4"],
    );

    // Check cards with highest average data attribute
    const readingGrid = await screen.findByTestId("observation-reading-grid");

    screen.debug(readingGrid);

    const averageCards = readingGrid.querySelectorAll(
      "[data-within-highest-average-period='true']",
    );
    expect(averageCards).toHaveLength(4);

    // Ensure array slice 5-10 have highest average
    const allReadingCards = await screen.findAllByTestId("reading-card");
    const highestAverageReadings = allReadingCards.slice(4, 8);
    highestAverageReadings.forEach((card) => {
      expect(card).toHaveAttribute("data-within-highest-average-period");
    });

    // Set the averaging period to 10
    await userEvent.click(screen.getByTestId("averaging-period-select"));
    await userEvent.selectOptions(
      screen.getByTestId("averaging-period-select"),
      ["8"],
    );

    // Check cards with highest average data attribute
    const readingGrid2 = screen.getByTestId("observation-reading-grid");
    const averageCards2 = readingGrid2.querySelectorAll(
      "[data-within-highest-average-period='true']",
    );
    expect(averageCards2).toHaveLength(8);

    // Ensure array slice 5-15 have highest average
    const allReadingCards2 = await screen.findAllByTestId("reading-card");
    const highestAverageReadings2 = allReadingCards2.slice(4, 12);
    highestAverageReadings2.forEach((card) => {
      expect(card).toHaveAttribute("data-within-highest-average-period");
    });
  }, 25000);
});
