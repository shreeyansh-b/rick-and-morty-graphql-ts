import { GenderType, StatusType } from "components/CharacterCard/CharacterCard";

export const routes = {
  home: "/",
  characters: "/characters",
  charactersPage: "/characters/page/:page",
  character: "/character/:id",
  characterSearch: "id=:id",
};

export const genders: Record<GenderType, string> = {
  Female: "Female",
  Male: "Male",
  Genderless: "Genderless",
  unknown: "unknown",
};

export const statuses: Record<StatusType, string> = {
  Alive: "Alive",
  Dead: "Dead",
  unknown: "unknown",
};
