import type { Meta, StoryObj } from "@storybook/react";
import CustomInputField from "../CustomHTMLElements/CustomInputField";

const meta = {
  component: CustomInputField,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    defaultValue: "Just for test",
    extraLabel: "Label",
    placeholder: "Placeholder",
  },
};
export const WithIcon: Story = {
  args: {
    type: "text",
    defaultValue: "",
    extraLabel: "Label",
    placeholder: "Placeholder",
    hasIcon: "@",
  },
};
export const Disabled: Story = {
  args: {
    type: "text",
    defaultValue: "Just for test",
    extraLabel: "Label",
    placeholder: "Placeholder",
    readOnly: true,
  },
};
export const Error: Story = {
  args: {
    type: "text",
    defaultValue: "Just for test",
    extraLabel: "Label",
    placeholder: "Placeholder",
    errors: "Error text",
  },
};
export const DateType: Story = {
  args: {
    type: "date",
    extraLabel: "Date",
    placeholder: "Placeholder",
  },
};
export const TimeType: Story = {
  args: {
    type: "time",
    extraLabel: "Time",
    placeholder: "Placeholder",
  },
};
export const NumberType: Story = {
  args: {
    type: "number",
    extraLabel: "Number",
    placeholder: "Placeholder",
  },
};
