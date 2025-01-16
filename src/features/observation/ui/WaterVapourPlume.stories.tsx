import type { Meta, StoryObj } from "@storybook/react";
import { WaterVapourPlumeDialog } from "./WaterVapourPlumeDialog";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Observation/Dialogs/WaterVapourPlumeDialog",
  component: WaterVapourPlumeDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WaterVapourPlumeDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
