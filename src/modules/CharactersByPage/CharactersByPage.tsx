import {
  Characters as CharactersType,
  Info,
  useCharactersQuery,
} from "generated/graphql";
import { Characters } from "modules/characters";
import { Center } from "@mantine/core";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Loader } from "components/Loader/Loader";

const CharactersByPage: NextPage = () => {
  const router = useRouter();
  const { page = 1, name = "", gender = "", status = "" } = router.query;

  const { data, isLoading } = useCharactersQuery({
    page: +page as number,
    name: String(name) ?? "",
    gender: String(gender) ?? "",
    status: String(status) ?? "",
  });

  const { results } = (data?.characters as CharactersType) ?? {};
  const info = (data?.characters?.info as Info) ?? {};

  if (isLoading) {
    // isLoading will only be true for the „initial“ loading when you have no data yet
    // Todo: refactor
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  return (
    <>
      <Characters results={results} info={info} />
    </>
  );
};

export { CharactersByPage };
