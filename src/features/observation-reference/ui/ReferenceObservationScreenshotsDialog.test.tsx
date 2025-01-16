import { ObservationScreenshot } from "@/features/observation-test/model";
import { MOCK_OBSERVATIONS } from "@/test/mock";
import { Wrapper } from "@/test/setup";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ReferenceObservationScreenshotsDialog } from "./ReferenceObservationScreenshotsDialog";

vi.mock("react-router-dom", (importOriginal) => ({
  ...importOriginal,
  useParams: () => ({ observationUID: MOCK_OBSERVATIONS[0].uid }),
}));

const downloadScreenshotsMock = vi.fn().mockImplementation((args) => {
  console.log("downloadScreenshotsMock called with:", args);
  return Promise.resolve({});
});

vi.mock("@/shared/hooks", () => {
  return {
    useDownloadScreenshots: () => ({
      isLoading: false,
      downloadScreenshots: downloadScreenshotsMock,
    }),
  };
});

const mockScreenshots: ObservationScreenshot[] = [
  {
    id: 1,
    created_at: "2021-09-01T00:00:00Z",
    modified_at: "2021-09-01T00:00:00Z",
    asset: {
      public_url: "https://placehold.co/600x400",
      object_name: "image1.jpg",
    },
    opacity: 0.5,
    revised_opacity: null,
    include_with_report: true,
    observation_id: MOCK_OBSERVATIONS[0].id,
    timestamp: "2021-09-01T00:00:00Z",
    latitude: 0,
    longitude: 0,
  },
  {
    id: 2,
    created_at: "2021-09-01T00:00:00Z",
    modified_at: "2021-09-01T00:00:00Z",
    asset: {
      public_url: "https://placehold.co/600x400",
      object_name: "image2.jpg",
    },
    opacity: 0.7,
    revised_opacity: null,
    include_with_report: true,
    observation_id: MOCK_OBSERVATIONS[0].id,
    timestamp: "2021-09-01T00:00:00Z",
    latitude: 0,
    longitude: 0,
  },
];

const mockOnClose = vi.fn();
const mockOnScreenshotClick = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  downloadScreenshotsMock.mockClear();
});

function renderComponent(isOpen = true) {
  render(
    <Wrapper initialEntries={[`/observations/${MOCK_OBSERVATIONS[0].uid}`]}>
      <ReferenceObservationScreenshotsDialog
        isOpen={isOpen}
        screenshots={mockScreenshots}
        onClose={mockOnClose}
        onScreenshotClick={mockOnScreenshotClick}
      />
    </Wrapper>,
  );
}

test("allows users to select images and download them", async () => {
  renderComponent();

  expect(screen.getByText("Images")).toBeInTheDocument();
  const images = screen.getAllByRole("img");
  expect(images).toHaveLength(mockScreenshots.length);

  const downloadButton = screen.getByText("Download");
  await userEvent.click(downloadButton);

  // Verify that the mode has changed to "download"
  expect(screen.getByText("Download images")).toBeInTheDocument();

  await userEvent.click(images[0]);
  await userEvent.click(images[1]);

  const selectedImages = await screen.findAllByRole("listitem");
  for (const image of selectedImages) {
    expect(image).toHaveAttribute("data-selected", "true");
  }

  // Verify the selection count
  const submitButton = screen.getByLabelText("download images"); // The number badge showing selected count
  expect(submitButton).toHaveTextContent("2Download images");
  await userEvent.click(submitButton);

  expect(downloadScreenshotsMock).toHaveBeenCalledWith({
    data: {
      screenshotObjectIds: [
        mockScreenshots[0].asset.object_name,
        mockScreenshots[1].asset.object_name,
      ],
    },
    observationUid: expect.any(String),
  });
});
