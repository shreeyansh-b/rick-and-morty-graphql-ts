import { GenderType, StatusType } from "components/CharacterCard/CharacterCard";
import { routes } from "constants/ProjectConstants";
import queryString from "query-string";

export const getCharactersPageRoute = ({ page }: { page: number }) => {
  return routes.charactersPage.replace(":page", String(page));
};

export const getCharacterPageRoute = ({ id }: { id: number }) => {
  return routes.character.replace(":id", String(id));
};

export const getCharacterSearchPageRoute = ({ id }: { id: number }) => {
  return routes.characterSearch.replace(":id", String(id));
};

export const filtersQueryGenerator = ({
  gender,
  status,
  name,
  id,
}: {
  gender?: GenderType;
  status?: StatusType;
  name?: string;
  id?: string;
}) => {
  return queryString.stringify({
    gender,
    status,
    name,
    id,
  });
};
