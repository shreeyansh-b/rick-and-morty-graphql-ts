import { routes } from "constants/ProjectConstants";

export const getCharacterPageRoute = ({ page }: { page: number }) => {
  return routes.charactersPage.replace(":page", String(page));
};
