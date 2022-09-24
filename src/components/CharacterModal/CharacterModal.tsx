import styled from "@emotion/styled";
import {
  Badge,
  Center,
  Container,
  Grid,
  Image,
  Modal,
  Paper,
  Text,
} from "@mantine/core";
import {
  GenderType,
  getColorFromGender,
  getColorFromStatus,
  StatusType,
} from "components/CharacterCard/CharacterCard";
import { EpisodesScrollArea } from "components/EpisodesScrollArea/EpisodesScrollArea";
import { Character, Episode } from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";

const CoverImage = styled(Image)`
  width: 150% !important;
  position: absolute;
  top: -70px;
  left: -70px;
  z-index: -10;
  user-select: none;
`;

const StyledModal = styled(Modal)`
  & .mantine-Modal-modal {
    overflow: hidden;
  }
  & .mantine-Modal-header {
    margin: 0;
  }
`;

export const CharacterModal: React.FC<Character> = ({
  gender,
  image,
  name,
  species,
  status,
  episode,
}) => {
  const router = useRouter();

  const onCloseHandler = () => {
    router.back();
  };

  return (
    <StyledModal
      opened={true}
      onClose={onCloseHandler}
      overlayOpacity={0.55}
      overlayBlur={3}
      size={600}
    >
      <Container sx={{ position: "relative" }}>
        <CoverImage
          src={image ?? ""}
          sx={{ filter: "blur(10px)" }}
          height={300}
        />
        <Center>
          <Image width={200} src={image ?? ""} alt="" p={"md"} radius="md" />
        </Center>
      </Container>
      <Paper radius={0} p={"xl"} sx={{ margin: "0 -20px" }}>
        <Center>
          <Text component="p" mt={0} size={"lg"} weight={"bold"}>
            {name}
          </Text>
        </Center>
        <Grid justify={"center"} align={"center"}>
          <Grid.Col span={3}>
            <Text m={0} component="p" size={"sm"}>
              Gender
            </Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <Badge
              color={getColorFromGender({
                gender: (gender as GenderType) ?? "",
              })}
              variant="light"
              size="sm"
              m={0}
            >
              {gender}
            </Badge>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text m={0} component="p" size={"sm"}>
              Species
            </Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <Badge color="grape.7" variant="light" size="sm" m={0}>
              {species}
            </Badge>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text m={0} component="p" size={"sm"}>
              Status
            </Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <Badge
              color={getColorFromStatus({
                status: (status as StatusType) ?? "",
              })}
              variant="light"
              size="sm"
              m={0}
            >
              {status}
            </Badge>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text m={0} component="p" size={"sm"}>
              Episodes
            </Text>
          </Grid.Col>
          <Grid.Col span={9}>
            <EpisodesScrollArea episode={(episode as Array<Episode>) ?? []} />
          </Grid.Col>
        </Grid>
      </Paper>
    </StyledModal>
  );
};
