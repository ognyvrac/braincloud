import { Button, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useRef, useState } from "react";
import { GroupType, IdeaType } from "../../model/AppTypes";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ensure } from "../../ResultScripts";
import { DroppableGroup } from "./components/DroppableGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const Group = () => {
  const [leftGroups, setLeftGroups] = useState<GroupType[]>([
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
  const [rightGroups, setRightGroups] = useState<GroupType[]>([]);
  const groupId = useRef(5);
  let navigate = useNavigate();

  function addGroup() {
    setRightGroups([
      ...rightGroups,
      {
        groupId: groupId.current,
        name: "Group " + groupId.current.toString(),
        ideasG: [],
      },
    ]);
    groupId.current = groupId.current + 1;
  }

  async function submitGroups() {
    setRightGroups(rightGroups.filter((group) => group.ideasG.length > 0));
    let noGroupIdeas: IdeaType[] = [];

    leftGroups.forEach((group) => {
      noGroupIdeas = noGroupIdeas.concat(group.ideasG);
    });

    const noGroup: GroupType = {
      groupId: 99,
      name: "No group",
      ideasG: noGroupIdeas,
    };

    let groupsToSubmit = rightGroups;
    groupsToSubmit.push(noGroup);

    const formData = new FormData();
    formData.append("groups", JSON.stringify(groupsToSubmit));

    await fetch("http://127.0.0.1:8000/api/ideas/groups", {
      method: "POST",
      mode: "cors",
      body: formData,
    });

    navigate("/vote");
  }

  /// Handles dragging
  function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let isLeftGroupDestination = +destination.droppableId <= 4;
    let isLeftGroupSource = +source.droppableId <= 4;

    let groupToRemoveFrom = {} as GroupType;
    if (isLeftGroupSource)
      groupToRemoveFrom = ensure(
        leftGroups.find(
          (group) => group.groupId.toString() === source.droppableId
        )
      );
    else {
      groupToRemoveFrom = ensure(
        rightGroups.find(
          (group) => group.groupId.toString() === source.droppableId
        )
      );
    }

    const idea = ensure(
      groupToRemoveFrom.ideasG.find(
        (idea) => idea.id.toString() === draggableId
      )
    );

    const removeFrom = Array.from(groupToRemoveFrom.ideasG);
    removeFrom.splice(source.index, 1);

    if (destination.droppableId === source.droppableId) {
      removeFrom.splice(destination.index, 0, idea);
      if (isLeftGroupSource) {
        setLeftGroups(
          leftGroups.map((group) =>
            group === groupToRemoveFrom
              ? {
                  ...group,
                  ideasG: removeFrom,
                }
              : group
          )
        );
      } else {
        setRightGroups(
          rightGroups.map((group) =>
            group === groupToRemoveFrom
              ? {
                  ...group,
                  ideasG: removeFrom,
                }
              : group
          )
        );
      }
    }

    if (destination.droppableId !== source.droppableId) {
      let groupToAddTo = {} as GroupType;
      if (isLeftGroupDestination) {
        groupToAddTo = ensure(
          leftGroups.find(
            (group) => group.groupId.toString() === destination.droppableId
          )
        );
      } else {
        groupToAddTo = ensure(
          rightGroups.find(
            (group) => group.groupId.toString() === destination.droppableId
          )
        );
      }

      const addTo = Array.from(groupToAddTo.ideasG);
      addTo.splice(destination.index, 0, idea);

      if (!isLeftGroupSource || !isLeftGroupDestination) {
        setRightGroups(
          rightGroups.map((group) => {
            if (group === groupToRemoveFrom) {
              return {
                ...group,
                ideasG: removeFrom,
              };
            } else if (group === groupToAddTo) {
              return {
                ...group,
                ideasG: addTo,
              };
            }
            return group;
          })
        );
      }
      setLeftGroups(
        leftGroups.map((group) => {
          if (group === groupToRemoveFrom) {
            return {
              ...group,
              ideasG: removeFrom,
            };
          } else if (group === groupToAddTo) {
            return {
              ...group,
              ideasG: addTo,
            };
          }
          return group;
        })
      );
    }
  }

  useEffect(() => {
    async function getIdeas() {
      const response = await fetch("http://127.0.0.1:8000/api/ideas", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      });

      let functionGroups: GroupType[] = leftGroups;

      response.json().then((e: any[]) => {
        e.forEach((element: any) => {
          let smallestGroup = {} as GroupType;
          let smallestLength = 1000;
          functionGroups.forEach((group) => {
            if (group.ideasG.length < smallestLength) {
              smallestLength = group.ideasG.length;
              smallestGroup = group;
            }
          });
          functionGroups = functionGroups.map((group) =>
            group.groupId === smallestGroup.groupId
              ? {
                  ...group,
                  ideasG: [
                    ...group.ideasG,
                    { id: element.id, content: element.content },
                  ],
                }
              : group
          );
        });
        setLeftGroups(functionGroups);
      });
    }
    getIdeas();
  }, []);

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div style={{ display: "flex", minHeight: "80vh" }}>
          <div style={{ width: "50%", display: "flex" }}>
            {leftGroups.map((group, index) => (
              <DroppableGroup group={group} key={index}></DroppableGroup>
            ))}
          </div>
          <div
            style={{
              width: "50%",
              flex: "1",
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addGroup}
            >
              Add group
            </Button>
            <Grid container spacing={3}>
              {rightGroups.map((group, index) => (
                <Grid item xs={4} key={index}>
                  <div
                    key={index}
                    style={{
                      background:
                        "radial-gradient(100% 162.15% at 0% 0%, rgba(255, 255, 255, 0.49) 0%, rgba(255, 255, 255, 0.07) 100%)",
                      boxShadow: "inset 0px 0px 60px rgba(255, 255, 255, 0.25)",
                      backdropFilter: "blur(12px)",
                      minHeight: "250px",
                    }}
                  >
                    {group.name}
                    <DroppableGroup group={group}></DroppableGroup>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </DragDropContext>
      <div style={{ textAlign: "center", paddingTop: "1em" }}>
        <FontAwesomeIcon
          icon={faArrowRight}
          transform="grow-5"
          onClick={submitGroups}
        />
      </div>
    </React.Fragment>
  );
};
