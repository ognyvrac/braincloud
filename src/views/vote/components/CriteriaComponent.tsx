import { Button } from "@mui/material";
import React, { useState } from "react";
import { Slider } from "./Slider";
import Dialog from "@mui/material/Dialog";
import { IdeaVoteType } from "../Vote";

interface ICriteriaProps {
  idea: IdeaVoteType;
  open: boolean;
  onClose: (idea: IdeaVoteType, criteria1: number, criteria2: number) => void;
}

export const CriteriaComponent = (props: ICriteriaProps) => {
  const { idea, open, onClose } = props;
  const [criteria1, setCriteria1] = useState(50);
  const [criteria2, setCriteria2] = useState(50);

  const resetCriteria = () => {
    setCriteria1(50);
    setCriteria2(50);
  };

  const handleClose = () => {
    onClose(idea, -1, -1);
    resetCriteria();
  };

  const handleVote = () => {
    onClose(idea, criteria1, criteria2);
    resetCriteria();
  };

  const handleCriteria1Slider = (value: number) => {
    setCriteria1(value);
  };

  const handleCriteria2Slider = (value: number) => {
    setCriteria2(value);
  };

  return (
    <React.Fragment>
      <Dialog onClose={handleClose} open={open}>
        {/* <div
          style={{
            height: "10%",
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(211, 82, 103, 0.8) 0%, rgba(133, 28, 84, 0.7) 49.48%, rgba(91, 20, 103, 0.8) 100%)",
          }}
        ></div> */}
        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <h3 style={{ textAlign: "left" }}>{idea.idea.content}</h3>
          <Slider value={criteria1} handleCriteria={handleCriteria1Slider} />
          <Slider value={criteria2} handleCriteria={handleCriteria2Slider} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 3fr",
            justifyItems: "center",
            paddingBottom: "10px"
          }}
        >
          <div>
            <Button variant="contained" color="secondary" onClick={handleVote}>
              Vote
            </Button>
          </div>
          <div>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
