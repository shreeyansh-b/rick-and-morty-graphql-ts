import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CharacterModal } from "./CharacterModal";

export default {
  title: "CharacterModal",
  component: CharacterModal,
} as ComponentMeta<typeof CharacterModal>;

export const Primary: ComponentStory<typeof CharacterModal> = () => (
  <CharacterModal episode={[]}></CharacterModal>
);
