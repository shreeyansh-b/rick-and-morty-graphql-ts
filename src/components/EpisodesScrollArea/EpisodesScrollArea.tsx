import { Badge, Grid, ScrollArea } from "@mantine/core";
import { Episode } from "generated/graphql";
import React from "react";

interface EpisodesScrollAreaProps {
  episode?: Array<Episode>;
}

export const EpisodesScrollArea: React.FC<EpisodesScrollAreaProps> = ({
  episode,
}) => {
  return (
    <ScrollArea.Autosize maxHeight={150}>
      <Grid
        p={"sm"}
        sx={{
          paddingLeft: "0px !important",
          paddingRight: "0px !important",
          width: "100%", //<- used to remove horizontal scroll from scroll area
        }}
        gutter={"xs"}
      >
        {episode?.map((episode) => {
          const { id, episode: episodeName } = (episode as Episode) ?? {};
          return (
            <Grid.Col key={id} span={3}>
              <Badge sx={{ width: "100%" }} variant="light" size="sm">
                {episodeName}
              </Badge>
            </Grid.Col>
          );
        })}
      </Grid>
    </ScrollArea.Autosize>
  );
};
