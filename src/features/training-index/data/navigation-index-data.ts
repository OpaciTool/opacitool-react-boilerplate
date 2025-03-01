export interface Module {
  id: number;
  title: string;
  slug: string;
  lectures: {
    title: string;
    slug: string;
  }[];
}

export const navigationIndexData: Module[] = [
  {
    id: 1,
    title: "OpaciTool App Basics",
    slug: "basics",
    lectures: [{ title: "Overview & Settings", slug: "overview-and-settings" }],
  },
  {
    id: 2,
    title: "Reference Mode Tutorial",
    slug: "reference-mode-tutorial",
    lectures: [
      {
        title: "Reference Mode - Using the App",
        slug: "reference-mode-using-the-app",
      },
      {
        title: "Reference Mode - Using the Dashboard",
        slug: "reference-mode-using-the-dashboard",
      },
    ],
  },
  {
    id: 3,
    title: "Test Mode Tutorial",
    slug: "test-mode-tutorial",
    lectures: [
      { title: "Test Mode - Using the App", slug: "test-mode-using-the-app" },
      { title: "Test Mode - Performing a Test", slug: "test-mode-performing-a-test" },
      { title: "Test Mode - Using the Dashboard", slug: "test-mode-using-the-dashboard" }
    ],
  }
];
