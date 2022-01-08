import { Button, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useRef, useState } from "react";
import { GroupType } from "../../model/AppTypes";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ensure } from "../../ResultScripts";
import { DroppableGroup } from "./components/DroppableGroup";

export const Group = () => {
  const [inputValue, setInputValues] = useState("");
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
  const ideaId = useRef(1);
  const groupId = useRef(5);

  function addGroup() {
    setRightGroups([
      ...rightGroups,
      { groupId: groupId.current, name: "Group " + groupId.current.toString(), ideasG: [] },
    ]);
    groupId.current = groupId.current + 1;
  }

  function submitIdea() {
    let smallestGroup = {} as GroupType;
    let smallestLength = 1000;
    if (inputValue !== "") {
      leftGroups.forEach((group) => {
        if (group.ideasG.length < smallestLength) {
          smallestLength = group.ideasG.length;
          smallestGroup = group;
        }
      });
      setLeftGroups(
        leftGroups.map((group) =>
          group.groupId === smallestGroup.groupId
            ? {
                ...group,
                ideasG: [
                  ...group.ideasG,
                  { ideaId: ideaId.current, content: inputValue },
                ],
              }
            : group
        )
      );
      ideaId.current = ideaId.current + 1;
      setInputValues("");
    }
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
        (idea) => idea.ideaId.toString() === draggableId
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

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div style={{ display: "flex"}}>
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
      {/* <div style={{ width: "376px", margin: "0 auto" }}>
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
      </div> */}
    </React.Fragment>
  );
};
