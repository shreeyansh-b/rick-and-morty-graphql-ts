import { Card } from "@mantine/core";
import { Header } from "components/Header";
import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <Header
      links={[
        {
          label: "Characters",
          link: "/characters",
        },
      ]}
    />
  );
};

export default Home;
