import type { Meta, StoryObj } from "@storybook/react";
import CustomCheckboxInput from "../CustomHTMLElements/CustomCheckboxInput";

const meta = {
  component: CustomCheckboxInput,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomCheckboxInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    label: "Checkbox",
  },
};
export const Checked: Story = {
  args: {
    checked: true,
    label: "Checkbox",
  },
};
export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
};
export const CheckedWithoutLabel: Story = {
  args: {
    checked: true,
  },
};
