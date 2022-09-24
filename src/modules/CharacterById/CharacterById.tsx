import { Character, useCharacterQuery } from "generated/graphql";
import { Center } from "@mantine/core";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Loader } from "components/Loader/Loader";
import { CharacterModal } from "components/CharacterModal";

const CharacterById: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useCharacterQuery(
    { id: String(id) },
    {
      enabled: Boolean(id),
    }
  );

  const { character } = data ?? {};

  const props = character as Character;

  if (!Boolean(id)) {
    return null;
  }

  if (isLoading) {
    // isLoading will only be true for the "initial" loading when you have no data yet
    // Todo: refactor
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  if (isError || !data?.character) {
    return null;
  }
  return <CharacterModal {...props} />;
};

export { CharacterById };
