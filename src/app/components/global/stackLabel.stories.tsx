import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as Components from "src/app/components";

export default {
  title: "Stack Label",
  component: Components.Global.StackLabel,
  argTypes: {
    direction: {
      options: ["column", "row"],
      control: { type: "radio" },
    },
    titleColor: { control: "color" },
    labelColor: {
      options: ["success", "error", "warning", "info", "primary", "secondary"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Components.Global.StackLabel>;

const Template: ComponentStory<typeof Components.Global.StackLabel> = (
  args
) => <Components.Global.StackLabel {...args} />;

export const Props = Template.bind({}); 
Props.args = {
  direction: "column",
  label: "StackLabel",
  title: "Title",
  node: true,
  medium: true,
  valBold: true,
  time: false,
};
