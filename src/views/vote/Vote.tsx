import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { GroupType, IdeaType } from "../../model/AppTypes";
import { IdeaVote } from "./components/IdeaVote";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

type IdeaVoteType = {
  idea: IdeaType;
  votes: number;
};

export const Vote = () => {
  const [inputValue, setInputValues] = useState("");
  const [ideas, setIdeas] = useState([] as IdeaVoteType[]);
  const [availableVotes, setAvailableVotes] = useState(4);
  const [groups, Groups] = useState<GroupType[]>([
    {
      groupId: 1,
      name: "",
      ideasG: [],
    },
    {
      groupId: 2,
      name: "",
      ideasG: [],
    },
    {
      groupId: 3,
      name: "",
      ideasG: [],
    },
  ]);

  function submitIdea() {
    if (inputValue !== "") {
      setIdeas([
        ...ideas,
        { idea: { ideaId: ideas.length, content: inputValue }, votes: 0 },
      ]);
      setInputValues("");
    }
  }

  function handleVote(idea: IdeaVoteType) {
    setIdeas(
      ideas.map((ideaMap) =>
        ideaMap.idea.ideaId === idea.idea.ideaId
          ? { ...ideaMap, votes: idea.votes + 1 }
          : ideaMap
      )
    );
    setAvailableVotes(availableVotes - 1);
    console.log(availableVotes);
  }

  function handleVoteIcons(votes: number) {
    let icons = [];
    for (let i = 0; i < votes; i++) {
      icons.push(
        <FontAwesomeIcon
          icon={faThumbsUp}
          color="#D35267"
          style={{ float: "left", marginLeft:"5px" }}
        />
      );
    }

    return icons;
  }

  return (
    <React.Fragment>
      <div style={{ height: "85%" }}>
        <Grid container rowSpacing={2}>
          {ideas.map((idea, index) => (
            <Grid item xs={2}>
              <div style={{ height: "22px", marginLeft:"5px" }}>
                {availableVotes < 1 ? null : (
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    color="#000000"
                    onClick={() => handleVote(idea)}
                    style={{ float: "right" }}
                  />
                )}

                {handleVoteIcons(idea.votes)}
              </div>
              <div>
                <IdeaVote
                  idea={idea.idea}
                  index={index}
                ></IdeaVote>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>

      <div style={{ width: "376px", margin: "0 auto" }}>
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
