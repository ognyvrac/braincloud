import React from "react";
import { Slider as MUISlider } from "@mui/material";

interface ISliderProps {
  value: number;
  handleCriteria: (value: number) => void
}

export const Slider = (props: ISliderProps) => {
  const {value, handleCriteria} = props;
  function handleChange(n: number | number[]) {
    if (typeof n == "number") {
      handleCriteria(n);
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
          {"Criteria"}
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
        style={{minWidth: "250px"}}
        value={value}
        color="secondary"
        aria-label="Default"
        onChange={(_, v) => handleChange(v)}
        valueLabelDisplay="auto"
      />
    </React.Fragment>
  );
};
