import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { Slider } from "./Slider";

export const CriteriaComponent = () => {
  return (
    <React.Fragment>
      <div
        style={{
          height: "10%",
          width: "100%",
          background:
            "linear-gradient(90deg, rgba(211, 82, 103, 0.8) 0%, rgba(133, 28, 84, 0.7) 49.48%, rgba(91, 20, 103, 0.8) 100%)",
        }}
      ></div>
      <div>
        <h3 style={{ textAlign: "left" }}>Create meme</h3>
        <Slider />
        <Slider />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Button variant="contained" color="secondary">Vote</Button>
        </div>
        <div style={{ flex: "1"}}>
          <Button variant="contained">Cancel</Button>
        </div>
      </div>
    </React.Fragment>
  );
};
