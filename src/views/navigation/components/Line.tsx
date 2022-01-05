import React from "react";
import { decideColor, ColorState } from "../../../model/StateEnum";

export const Line = ({ state }: { state: ColorState }) => {
  let styling = "1px solid " + decideColor(state);
  return (
    <React.Fragment>
      <div
        style={{
          border: styling,
          height: "70px",
          width: "0",
          margin: "0 auto",
          marginTop: "19px",
        }}
      ></div>
    </React.Fragment>
  );
};
