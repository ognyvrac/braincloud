import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { IdeaType } from "../../model/AppTypes";
import { Idea } from "./components/Idea";

export const Generate = () => {
  const [inputValue, setInputValues] = useState("");
  const [ideas, setIdeas] = useState([] as IdeaType[]);

  function submitIdea() {
    if (inputValue !== "") {
      setIdeas([...ideas, { ideaId: ideas.length, content: inputValue }]);
      setInputValues("");
    }
  }
  return (
    <React.Fragment>
      <div style={{ height: "60%" }}>
        <Grid container rowSpacing={2} spacing={3}>
          {ideas.map((idea, index) => (
            <Grid item xs={2}>
              <Idea idea={idea} index={index} isDraggable={false}></Idea>
            </Grid>
          ))}
        </Grid>
      </div>

      <div
        style={{
          width: "376px",
          margin: "0 auto",
          background: "white",
          borderRadius: "5px",
        }}
      >
        <TextField
          hiddenLabel
          placeholder="Type text here..."
          multiline
          rows={7}
          color="secondary"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValues(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                style={{ marginTop: "35%" }}
                color="secondary"
                onClick={submitIdea}
              >
                Submit
              </Button>
            ),
          }}
        />
      </div>
    </React.Fragment>
  );
};
