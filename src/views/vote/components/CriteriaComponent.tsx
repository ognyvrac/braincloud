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
  const [criteria1, setCriteria1] = useState(2);
  const [criteria2, setCriteria2] = useState(2);

  const resetCriteria = () => {
    setCriteria1(2);
    setCriteria2(2);
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
