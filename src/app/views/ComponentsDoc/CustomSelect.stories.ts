import type { Meta, StoryObj } from "@storybook/react";
import CustomSelect from "../components/CustomHTMLElements/CustomSelect";

const meta = {
  component: CustomSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: "Hey", label: "Hey" },
      { value: "Hi", label: "Hi" },
      { value: "John", label: "John" },
      { value: "Doe", label: "Doe" },
    ],
    name: "select",
    extraLabel: "Select",
  },
};
export const WithValue: Story = {
  args: {
    options: [
      { value: "Hey", label: "Hey" },
      { value: "Hi", label: "Hi" },
      { value: "John", label: "John" },
      { value: "Doe", label: "Doe" },
    ],
    name: "select",
    extraLabel: "Select",
    defaultValue: "John",
  },
};
export const Disabled: Story = {
  args: {
    options: [
      { value: "Hey", label: "Hey" },
      { value: "Hi", label: "Hi" },
      { value: "John", label: "John" },
      { value: "Doe", label: "Doe" },
    ],
    name: "select",
    extraLabel: "Select",
    isDisabled: true,
  },
};
export const Error: Story = {
  args: {
    options: [
      { value: "Hey", label: "Hey" },
      { value: "Hi", label: "Hi" },
      { value: "John", label: "John" },
      { value: "Doe", label: "Doe" },
    ],
    name: "select",
    extraLabel: "Select",
    errors: "Wrong selections",
  },
};
export const isMulti: Story = {
  args: {
    options: [
      { value: "Hey", label: "Hey" },
      { value: "Hi", label: "Hi" },
      { value: "John", label: "John" },
      { value: "Doe", label: "Doe" },
    ],
    name: "select",
    extraLabel: "Select",
    isMulti: true,
  },
};
