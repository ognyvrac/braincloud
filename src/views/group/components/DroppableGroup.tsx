import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { GroupType } from "../../../model/AppTypes";
import { Idea } from "../../generate/components/Idea";

export const DroppableGroup = ({ group }: { group: GroupType }) => {
  return (
    <React.Fragment>
      <Droppable droppableId={group.groupId.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ paddingLeft: "10px", width:"80%", minHeight:"200px" }}
          >
            {group.ideasG.map((idea, index) => (
              <Idea
                key={idea.id}
                idea={idea}
                index={index}
                isDraggable={true}
              ></Idea>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </React.Fragment>
  );
};
