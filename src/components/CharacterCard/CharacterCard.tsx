import React from "react";
import { Character } from "generated/graphql";
import { Badge, Card, Group, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";
import {
  filtersQueryGenerator,
  getCharacterPageRoute,
  getCharacterSearchPageRoute,
} from "helpers";
import queryString from "query-string";

export type GenderType = "Female" | "Male" | "Genderless" | "unknown";

export type StatusType = "Alive" | "Dead" | "unknown";

export const getColorFromGender = ({ gender }: { gender: GenderType }) => {
  switch (gender) {
    case "Male":
      return "blue.3";
    case "Female":
      return "pink.4";
    case "Genderless":
      return "indigo.2";
    case "unknown":
      return "teal.5";
    default:
      return "blue.3";
  }
};

export const getColorFromStatus = ({ status }: { status: StatusType }) => {
  switch (status) {
    case "Alive":
      return "green.7";
    case "Dead":
      return "red.7";
    case "unknown":
      return "grey.7";
    default:
      return "green.7";
  }
};

export const CharacterCard: React.FC<Character> = ({
  id,
  gender,
  image,
  name,
  species,
  status,
}) => {
  const router = useRouter();
  const { query, asPath } = router;
  const pathname = asPath.split("?")[0]; // @https://github.com/vercel/next.js/discussions/33243#discussioncomment-2576346

  const onCardClickHandler = ({ id }: { id: number }) => {
    const urlQuery = filtersQueryGenerator({ ...query, id: String(id) });
    router.push({
      pathname: pathname,
      query: urlQuery,
    });
  };

  return (
    <Card
      onClick={() => {
        onCardClickHandler({ id: Number(id) });
      }}
      sx={{ height: "100%" }}
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image src={image ?? ""} alt={name ?? ""} withPlaceholder />
      </Card.Section>

      <Text
        component="p"
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          width: "100%",
          whiteSpace: "nowrap",
        }}
        size={"sm"}
        weight={"bold"}
      >
        {name}
      </Text>
      <Group sx={{ gap: "10px" }}>
        <Badge
          color={getColorFromGender({ gender: (gender as GenderType) ?? "" })}
          variant="light"
          size="sm"
        >
          {gender}
        </Badge>
        <Badge color="grape.7" variant="light" size="sm">
          {species}
        </Badge>
        <Badge
          color={getColorFromStatus({ status: (status as StatusType) ?? "" })}
          variant="light"
          size="sm"
        >
          {status}
        </Badge>
      </Group>
    </Card>
  );
};
