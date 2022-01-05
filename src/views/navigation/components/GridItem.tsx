import React from "react";
import { Grid } from "@mui/material";
import { ColorState, IconState } from "../../../model/StateEnum";
import { Circle } from "./Circle";
import { Line } from "./Line";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

interface GridItemProps {
  icon: IconState;
  color: ColorState;
  stepNumber: number;
  topic: string;
  includeLine: boolean;
}

/** Grid item component, which is used in the navigation to display a step. */
export const GridItem = (props: GridItemProps) => {
  return (
    <React.Fragment>
      <Grid item xs={5}>
        <Circle icon={props.icon} state={props.color}></Circle>
        {props.includeLine && <Line state={props.color}></Line>}
      </Grid>
      <Grid item xs={7}>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "13px",
              color: "#66707C",
            }}
          >
            {"Step " + props.stepNumber}
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {props.topic}
            </div>
            {/* {props.color === ColorState.InProgress && (
              <div style={{ flex: "1", marginLeft: "3px" }}>
                <FontAwesomeIcon icon={faQuestionCircle} color="#66707C" />
              </div>
            )} */}
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
};
