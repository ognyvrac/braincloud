import React from "react";
import { GridItem } from "./components/GridItem";
import { ColorState, IconState } from "../../model/StateEnum";
import { Grid } from "@mui/material";

export const Navigation = () => {
  return (
    <React.Fragment>
        <Grid container rowSpacing={2}>
          <GridItem
            icon={IconState.Generate}
            color={ColorState.InProgress}
            stepNumber={1}
            topic="Generate ideas alone"
            includeLine={true}
          />
          <GridItem
            icon={IconState.Group}
            color={ColorState.Inactive}
            stepNumber={2}
            topic="Group ideas"
            includeLine={true}
          />
          <GridItem
            icon={IconState.Vote}
            color={ColorState.Inactive}
            stepNumber={3}
            topic="Vote"
            includeLine={true}
          />
          <GridItem
            icon={IconState.Winner}
            color={ColorState.Inactive}
            stepNumber={4}
            topic="Choose winner"
            includeLine={false}
          />
        </Grid>
    </React.Fragment>
  );
};
