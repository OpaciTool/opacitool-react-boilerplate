export interface Resource {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  fileUrl: string;
  fileType: "pdf" | "excel"; // Added PDF URL for each resource
}

export const resources: Resource[] = [
  {
    id: "1",
    title: "EPA Method 9 Reference Sheet",
    description:
      "A printable form that can be used as a reference during your visible emissions observations.",
    thumbnail: "module-10/method-9-reference-sheet.jpg",
    fileUrl: "module-10/method-9-reference-sheet.pdf",
    fileType: "pdf", // Example PDF URL
  },
  {
    id: "2",
    title: "EPA Method 9 Test Form",
    description:
      "Use this for documenting EPA Method 9 observations. Each form can hold 60 minutes of observation data.",
    thumbnail: "module-10/epa-method-9-test-form.jpg",
    fileUrl: "module-10/epa-method-9-test-form.pdf",
    fileType: "pdf",
  },
  {
    id: "3",
    title: "EPA Method 22 Test Form",
    description:
      "Use this for documenting indoor and outdoor EPA Method 22 observations.",
    thumbnail: "module-10/method-22-test-form.jpg",
    fileUrl: "module-10/method-22-test-form.pdf",
    fileType: "pdf",
  },
  {
    id: "4",
    title: "EPA Method 203c Test Form",
    description:
      "Use this for EPA Method 203c tests. This form is different than the EPA Method 9 test form and allows for 5 second observation intervals.",
    thumbnail: "module-10/method-203c-test-form.jpg",
    fileUrl: "module-10/method-203c-test-form.pdf",
    fileType: "pdf",
  },
  {
    id: "5",
    title: "Angle Correction Chart",
    description:
      "If your viewing angle is more than 18°, this chart provides corrected values so you don't need to perform calculations for each value.",
    thumbnail: "module-10/angle-opacity-correction-chart.jpg",
    fileUrl: "module-10/angle-opacity-correction-chart.jpg",
    fileType: "pdf",
  },
  {
    id: "6",
    title: "Psychrometric Chart",
    description: "Use this when determining the probability of a steam plume.",
    thumbnail: "module-10/PSYCHROMETRIC-CHART.jpg",
    fileUrl: "module-10/PSYCHROMETRIC-CHART.pdf",
    fileType: "pdf",
  },
  {
    id: "7",
    title: "Rolling Average Calculator",
    description:
      "This is an Excel file that allows you to input your readings and determine the rolling average.",
    thumbnail: "module-10/excel-logo.png",
    fileUrl: "module-10/rolling-average-calculator.xls",
    fileType: "excel",
  },
];
