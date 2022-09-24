import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CharacterCard } from "./CharacterCard";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Character Card",
  component: CharacterCard,
} as ComponentMeta<typeof CharacterCard>;

export const Primary: ComponentStory<typeof CharacterCard> = () => {
  const args = {
    gender: "Male",
    name: "Rick Sanchez",
    id: "1",
    status: "Alive",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    species: "Human",
  };
  return <CharacterCard {...args}></CharacterCard>;
};
