import { routes } from "constants/ProjectConstants";

export const getCharactersPageRoute = ({ page }: { page: number }) => {
  return routes.charactersPage.replace(":page", String(page));
};

export const getCharacterPageRoute = ({ id }: { id: number }) => {
  return routes.character.replace(":id", String(id));
};

export const getCharacterSearchPageRoute = ({ id }: { id: number }) => {
  return routes.characterSearch.replace(":id", String(id));
};
