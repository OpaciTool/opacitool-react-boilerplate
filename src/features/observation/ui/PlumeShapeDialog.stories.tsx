import type { Meta, StoryObj } from "@storybook/react";
import { PlumeShapeDialog } from "./PlumeShapeDialog";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Observation/Dialogs/PlumeShapeDialog",
  component: PlumeShapeDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PlumeShapeDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
