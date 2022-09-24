import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Loader } from "./Loader";

export default {
  title: "Loader",
  component: Loader,
} as ComponentMeta<typeof Loader>;

export const Primary: ComponentStory<typeof Loader> = () => <Loader></Loader>;
