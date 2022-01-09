import { Grid } from "@mui/material";
import React, { useState, useRef } from "react";
import { IdeaType } from "../../model/AppTypes";
import { CriteriaComponent } from "./components/CriteriaComponent";
import { IdeaVote } from "./components/IdeaVote";

export type IdeaVoteType = {
  idea: IdeaType;
  votes: number;
  criteria1: number;
  criteria2: number;
};

type GroupVoteType = {
  name: string;
  ideas: IdeaVoteType[];
};

export const Vote = () => {
  const [inputValue, setInputValues] = useState("");
  const [ideas, setIdeas] = useState([] as IdeaVoteType[]);
  const [availableVotes, setAvailableVotes] = useState(4);
  const [groups, setGroups] = useState<GroupVoteType[]>([
    {
      name: "Test",
      ideas: [
        {
          idea: { ideaId: 69, content: "vargal" },
          votes: 0,
          criteria1: -1,
          criteria2: -1,
        },
        {
          idea: { ideaId: 70, content: "132" },
          votes: 0,
          criteria1: -1,
          criteria2: -1,
        },
      ],
    },
    {
      name: "Bob",
      ideas: [
        {
          idea: { ideaId: 66, content: "meme" },
          votes: 0,
          criteria1: -1,
          criteria2: -1,
        },
        {
          idea: { ideaId: 79, content: "shumen" },
          votes: 0,
          criteria1: -1,
          criteria2: -1,
        },
      ],
    },
  ]);
  const selectedIdea = useRef<IdeaVoteType>();
  const [open, setOpen] = useState(false);

  const tryFindGroupOfIdea = (idea: IdeaVoteType) => {
    let group: GroupVoteType | undefined;
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].ideas.includes(idea)) {
        group = groups[i];
        break;
      } else {
        group = undefined;
      }
    }
    return group;
  };

  const handleCloseVote = (
    idea: IdeaVoteType,
    criteria1: number,
    criteria2: number
  ) => {
    if (criteria1 !== -1 && criteria2 !== -1) {
      const group = tryFindGroupOfIdea(idea);
      if (group === undefined) {
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
      } else {
        setGroups(
          groups.map((g) =>
            g === group
              ? {
                  ...g,
                  ideas: g.ideas.map((i) =>
                    idea.idea.ideaId === i.idea.ideaId
                      ? {
                          ...i,
                          votes: i.votes + 1,
                          criteria1: criteria1,
                          criteria2: criteria2,
                        }
                      : i
                  ),
                }
              : g
          )
        );
      }
      setAvailableVotes(availableVotes - 1);
    }
    setOpen(false);
  };

  function handleVote(idea: IdeaVoteType) {
    selectedIdea.current = idea;
    if (idea.criteria1 === -1 && idea.criteria2 === -1) {
      setOpen(true);
    } else {
      const group = tryFindGroupOfIdea(idea);
      if (group === undefined) {
        setIdeas(
          ideas.map((ideaMap) =>
            ideaMap.idea.ideaId === idea.idea.ideaId
              ? { ...ideaMap, votes: idea.votes + 1 }
              : ideaMap
          )
        );
      } else {
        setGroups(
          groups.map((g) =>
            g === group
              ? {
                  ...g,
                  ideas: g.ideas.map((i) =>
                    idea.idea.ideaId === i.idea.ideaId
                      ? { ...i, votes: i.votes + 1 }
                      : i
                  ),
                }
              : g
          )
        );
      }
      setAvailableVotes(availableVotes - 1);
    }
  }

  return (
    <React.Fragment>
      <div>
        <Grid container rowSpacing={2} spacing={8}>
          {ideas.map((idea, index) => (
            <Grid item xs={3} key={index}>
              <IdeaVote
                index={index}
                idea={idea}
                availableVotes={availableVotes}
                handleVote={handleVote}
              />
            </Grid>
          ))}
          {groups.map((group, index) => (
            <Grid item xs={3} key={index}>
              <div
                style={{
                  background:
                    "radial-gradient(100% 162.15% at 0% 0%, rgba(255, 255, 255, 0.49) 0%, rgba(255, 255, 255, 0.07) 100%)",
                  boxShadow: "inset 0px 0px 60px rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(12px)",
                  paddingBottom: "10px",
                }}
              >
                <h3>{group.name}</h3>
                {group.ideas.map((idea, indexg) => (
                  <IdeaVote
                    key={indexg}
                    index={indexg}
                    idea={idea}
                    availableVotes={availableVotes}
                    handleVote={handleVote}
                  />
                ))}
              </div>
            </Grid>
          ))}
        </Grid>
        {selectedIdea.current === undefined ||
        selectedIdea.current === null ? null : (
          <CriteriaComponent
            idea={selectedIdea.current}
            open={open}
            onClose={handleCloseVote}
          />
        )}
      </div>
    </React.Fragment>
  );
};
