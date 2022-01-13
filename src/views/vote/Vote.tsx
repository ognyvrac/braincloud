import { Grid } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { IdeaType } from "../../model/AppTypes";
import { CriteriaComponent } from "./components/CriteriaComponent";
import { IdeaVote } from "./components/IdeaVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export type IdeaVoteType = {
  idea: IdeaType;
  votes: number;
  criteria1: number;
  criteria2: number;
  groupId: number;
};

type GroupVoteType = {
  id: number;
  name: string;
  ideas: IdeaVoteType[];
};

export const Vote = () => {
  const [ideas, setIdeas] = useState([] as IdeaVoteType[]);
  const [availableVotes, setAvailableVotes] = useState(4);
  const [groups, setGroups] = useState<GroupVoteType[]>([]);
  const selectedIdea = useRef<IdeaVoteType>();
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    async function getGroups() {
      const groupsResponse = await fetch("http://127.0.0.1:8000/api/groups", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      });

      let functionGroups: GroupVoteType[] = [];

      await groupsResponse.json().then((groups: any[]) => {
        groups.forEach((group: any) => {
          if (group.name !== "No group") {
            functionGroups.push({
              id: group.id,
              name: group.name,
              ideas: [],
            });
          }
        });
      });

      const ideasResponse = await fetch("http://127.0.0.1:8000/api/ideas", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      });

      let functionIdeas: IdeaVoteType[] = [];
      let functionNoGroupIdeas: IdeaVoteType[] = [];

      await ideasResponse.json().then((ideas: any[]) => {
        ideas.forEach((idea: any) => {
          if (idea.group_id === 1) {
            functionNoGroupIdeas.push({
              idea: {
                id: idea.id,
                content: idea.content,
              },
              votes: 0,
              criteria1: -1,
              criteria2: -1,
              groupId: idea.group_id,
            });
          } else {
            functionIdeas.push({
              idea: {
                id: idea.id,
                content: idea.content,
              },
              votes: 0,
              criteria1: -1,
              criteria2: -1,
              groupId: idea.group_id,
            });
          }
        });
      });

      setIdeas(functionNoGroupIdeas);

      setGroups(
        functionGroups.map((group) => {
          functionIdeas.forEach((idea) => {
            if (idea.groupId === group.id) {
              group.ideas.push(idea);
            }
          });
          return group;
        })
      );
    }
    getGroups();
  }, []);

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
      const formData = new FormData();
      formData.append("criteria1", criteria1.toString());
      formData.append("criteria2", criteria2.toString());

      fetch(
        "http://127.0.0.1:8000/api/ideas/criteria/votes_first/" + idea.idea.id,
        {
          method: "POST",
          mode: "cors",
          body: formData,
        }
      );

      const group = tryFindGroupOfIdea(idea);
      if (group === undefined) {
        setIdeas(
          ideas.map((ideaMap) =>
            ideaMap.idea.id === idea.idea.id
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
                    idea.idea.id === i.idea.id
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
      fetch("http://127.0.0.1:8000/api/ideas/votes_first/" + idea.idea.id, {
        method: "POST",
        mode: "cors",
      });

      const group = tryFindGroupOfIdea(idea);
      if (group === undefined) {
        setIdeas(
          ideas.map((ideaMap) =>
            ideaMap.idea.id === idea.idea.id
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
                    idea.idea.id === i.idea.id
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
      <div style={{minHeight: "80vh"}}>
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
      <div style={{ textAlign: "center", paddingTop: "1em" }}>
        <FontAwesomeIcon
          icon={faArrowRight}
          transform="grow-5"
          onClick={() => navigate("/choose")}
        />
      </div>
    </React.Fragment>
  );
};
