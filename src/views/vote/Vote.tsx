import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import { GroupType, IdeaType } from "../../model/AppTypes";
import { IdeaVote } from "./components/IdeaVote";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Idea } from "../generate/components/Idea";
import { CriteriaComponent } from "./components/CriteriaComponent";
import { ensure } from "../../ResultScripts";

export type IdeaVoteType = {
  idea: IdeaType;
  votes: number;
  criteria1: number;
  criteria2: number;
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
  const selectedIdea = useRef<IdeaVoteType>();
  const [open, setOpen] = useState(false);
  const [criteria1, setCriteria1] = useState(-1);
  const [criteria2, setCriteria2] = useState(-1);

  function submitIdea() {
    if (inputValue !== "") {
      setIdeas([
        ...ideas,
        {
          idea: { ideaId: ideas.length, content: inputValue },
          votes: 0,
          criteria1: -1,
          criteria2: -1,
        },
      ]);
      setInputValues("");
    }
  }

  const handleCloseVote = (
    idea: IdeaVoteType,
    criteria1: number,
    criteria2: number
  ) => {
    if (criteria1 !== -1 && criteria2 !== -1) {
      setIdeas(
        ideas.map((ideaMap) =>
          ideaMap.idea.ideaId === idea.idea.ideaId
            ? {
                ...ideaMap,
                votes: idea.votes + 1,
                criteria1: criteria1,
                criteria2: criteria2,
              }
            : ideaMap
        )
      );
      setAvailableVotes(availableVotes - 1);
    }
    setOpen(false);
    console.log(ideas);
  };

  function handleVote(idea: IdeaVoteType) {
    selectedIdea.current = idea;
    if (idea.criteria1 === -1 && idea.criteria2 === -1) {
      setOpen(true);
    } else {
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
  }

  function handleVoteIcons(votes: number) {
    let icons = [];
    for (let i = 0; i < votes; i++) {
      icons.push(
        <FontAwesomeIcon
          key={i}
          icon={faThumbsUp}
          color="#D35267"
          style={{ float: "left", marginLeft: "5px" }}
        />
      );
    }

    return icons;
  }

  return (
    <React.Fragment>
      <div>
        <Grid container rowSpacing={2} spacing={6}>
          {ideas.map((idea, index) => (
            <Grid item xs={3} key={index}>
              <div style={{ height: "22px", marginLeft: "5px" }}>
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
                <Idea idea={idea.idea} index={index} isDraggable={false}></Idea>
              </div>
            </Grid>
          ))}
        </Grid>
        {selectedIdea.current === undefined || selectedIdea.current === null ? (
          <div></div>
        ) : (
          <CriteriaComponent
            idea={selectedIdea.current}
            open={open}
            onClose={handleCloseVote}
          />
        )}
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
