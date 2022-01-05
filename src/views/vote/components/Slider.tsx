import React, { useState } from "react";
import { Slider as MUISlider } from "@mui/material";

export const Slider = () => {
  const [value, setValue] = useState(50);

  function handleChange(n: number | number[]) {
    if (typeof n == "number") {
      setValue(n);
    }
  }

  return (
    <React.Fragment>
      <div style={{textAlign: "left"}}>
        <div
          style={{
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "13px",
            color: "#66707C",
          }}
        >
          {"Criteria 1"}
        </div>
        <div
          style={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {"Innovative"}
        </div>
      </div>
      <MUISlider
        value={value}
        aria-label="Default"
        onChange={(_, v) => handleChange(v)}
        valueLabelDisplay="auto"
      />
    </React.Fragment>
  );
};
