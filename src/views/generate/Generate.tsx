import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IdeaType } from "../../model/AppTypes";
import { Idea } from "./components/Idea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Generate = () => {
  const [inputValue, setInputValues] = useState("");
  const [ideas, setIdeas] = useState([] as IdeaType[]);
  let navigate = useNavigate();

  function submitIdea() {
    if (inputValue !== "") {
      setIdeas([...ideas, { id: ideas.length, content: inputValue }]);
      setInputValues("");
    }
  }

  async function sendIdeas() {
    const formData = new FormData();
    formData.append("ideas", JSON.stringify(ideas));

    await fetch("http://127.0.0.1:8000/api/ideas/create", {
      method: "POST",
      mode: "cors",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    navigate("/group");
  }

  return (
    <React.Fragment>
      <div style={{ minHeight: "55vh" }}>
        <Grid container rowSpacing={2} spacing={3}>
          {ideas.map((idea, index) => (
            <Grid item xs={2} key={index}>
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
      <div style={{ textAlign: "center", paddingTop: "1em" }}>
        <FontAwesomeIcon
          icon={faArrowRight}
          transform="grow-5"
          onClick={sendIdeas}
        />
      </div>
    </React.Fragment>
  );
};
