import React from "react";
import {
  Character,
  Characters as CharactersProps,
  Info,
} from "generated/graphql";
import { CharacterCard } from "components/CharacterCard";
import { Center, Container, Grid, Pagination } from "@mantine/core";
import { useRouter } from "next/router";
import { getCharactersPageRoute } from "helpers";

export const Characters: React.FC<CharactersProps> = ({
  results = [],
  info,
}) => {
  const router = useRouter();
  const { page = 1 } = router.query;

  const { pages } = (info as Info) ?? {};

  const pageChangeHandler = (page: number) => {
    const query = router.query;
    delete query.page;
    router.push({
      pathname: getCharactersPageRoute({ page }),
      query: query,
    });
  };

  return (
    <Container>
      <Grid gutter="lg">
        {results?.map((char) => {
          const { id } = (char as Character) ?? {}; // <-  " ?? {} " makes sure it's an objects and removes <Maybe>
          const characterData = (char as Character) ?? {};
          return (
            <Grid.Col key={id} span={3}>
              <CharacterCard {...characterData} />
            </Grid.Col>
          );
        })}
      </Grid>
      <Center>
        <Pagination
          my={"lg"}
          radius="md"
          total={pages ?? 0}
          page={+page as number}
          onChange={pageChangeHandler}
        />
      </Center>
    </Container>
  );
};
