import type { Meta, StoryObj } from "@storybook/react";
import CustomOtpInput from "../CustomHTMLElements/CustomOtpInput";

const meta = {
  component: CustomOtpInput,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomOtpInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: () => {},
    value: "",
    valueLength: 6,
  },
};
export const WithValue: Story = {
    args: {
        onChange: () => {},
        value: "123456",
        valueLength: 6,
      },
};
export const FourColumn: Story = {
    args: {
        onChange: () => {},
        value: "",
        valueLength: 4,
      },
};
