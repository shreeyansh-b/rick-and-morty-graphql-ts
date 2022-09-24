import React from "react";
import {
  Badge,
  Container,
  Divider,
  Group,
  Navbar as MantineNavbar,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  getColorFromGender,
  getColorFromStatus,
  GenderType,
  StatusType,
} from "components/CharacterCard/CharacterCard";
import { genders, statuses } from "constants/ProjectConstants";

export const Navbar: React.FC<{}> = () => {
  const gendersArray = Object.values(genders);
  const statusesArray = Object.values(statuses);
  return (
    <MantineNavbar width={{ base: 300 }} p={"md"}>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Text component="p" size={"md"} weight={"bold"}>
          Filters
        </Text>
        <Divider sx={{ width: "100%" }} />

        <Text component="p" size={"sm"} weight={"bold"}>
          Gender
        </Text>
        <Group sx={{ gap: "10px" }}>
          {gendersArray.map((gender, index) => (
            <Tooltip
              key={`gender_${index}_${gender}`}
              label={`Filter by ${gender}`}
            >
              <Badge
                color={getColorFromGender({
                  gender: (gender as GenderType) ?? "",
                })}
                variant="light"
                size="sm"
                sx={{ cursor: "pointer" }}
              >
                {gender}
              </Badge>
            </Tooltip>
          ))}
        </Group>

        <Divider sx={{ width: "100%" }} mt={"md"} />

        <Text component="p" size={"sm"} weight={"bold"}>
          Status
        </Text>
        <Group sx={{ gap: "10px" }}>
          {statusesArray.map((status, index) => (
            <Tooltip
              key={`gender_${index}_${status}`}
              label={`Filter by ${status}`}
            >
              <Badge
                color={getColorFromStatus({
                  status: (status as StatusType) ?? "",
                })}
                variant="light"
                size="sm"
                key={`status_${index}_${status}`}
                sx={{ cursor: "pointer" }}
              >
                {status}
              </Badge>
            </Tooltip>
          ))}
        </Group>
      </Container>
    </MantineNavbar>
  );
};
