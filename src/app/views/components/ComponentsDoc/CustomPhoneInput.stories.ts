import type { Meta, StoryObj } from "@storybook/react";
import CustomPhoneInput from "../CustomHTMLElements/CustomPhoneInput";

const meta = {
  component: CustomPhoneInput,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomPhoneInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: "+2349012345678",
    extraLabel: "Phone",
  },
};
export const WithIcon: Story = {
  args: {
    defaultValue: "+2349012345678",
    extraLabel: "Phone",
  },
};
export const Disabled: Story = {
  args: {
    defaultValue: "+2349012345678",
    extraLabel: "Phone",
  },
};
export const Error: Story = {
  args: {
    defaultValue: "+2349012345678",
    extraLabel: "Phone",
  },
};
export const DateType: Story = {
  args: {
    defaultValue: "+2349012345678",
    extraLabel: "Phone",
  },
};
export const TimeType: Story = {
  args: {
    defaultValue: "+2349012345678",
    extraLabel: "Phone",
  },
};
export const NumberType: Story = {
  args: {
    defaultValue: "+2349012345678",
    extraLabel: "Phone",
  },
};
