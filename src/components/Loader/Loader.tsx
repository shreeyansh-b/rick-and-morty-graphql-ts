import {
  Center,
  Container,
  Image,
  Loader as MantineLoader,
} from "@mantine/core";
import React from "react";

const GIFS_SRC = [
  "/assets/gifs/rick.gif",
  "/assets/gifs/rick_wink.gif",
  "/assets/gifs/rick_levitating.gif",
];

const generateRandomInteger = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const Loader: React.FC<{}> = () => {
  return (
    <Center
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Image
        src={GIFS_SRC[generateRandomInteger(0, GIFS_SRC.length - 1)]}
        alt=""
        height={200}
      />
      <MantineLoader my={"md"} />
    </Center>
  );
};
