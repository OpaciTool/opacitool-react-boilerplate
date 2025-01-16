import type { Meta, StoryObj } from "@storybook/react";
import { TextDialog } from "./TextDialog";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Observation/Dialogs/TextDialog",
  component: TextDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    paragraphs: ["Paragraph 1", "Paragraph 2"],
    title: "Title",
  },
};
