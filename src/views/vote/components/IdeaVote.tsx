import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IdeaType } from "../../../model/AppTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export const IdeaVote = ({
  idea,
  index,
}: {
  idea: IdeaType;
  index: number;
}) => {
  const element = (
    <React.Fragment>
      <div
        style={{
          height: "65px",
          display: "flex",
          marginLeft: "5px",
        }}
      >
        <div
          style={{
            width: "10%",
            background:
              "linear-gradient(360deg, rgba(211, 82, 103, 0.8) 0%, rgba(133, 28, 84, 0.7) 49.48%, rgba(91, 20, 103, 0.8) 100%)",
            borderRadius: "0px 0px 0px 15px",
          }}
        ></div>
        <div
          style={{
            width: "90%",
            background: "yellow",
            // "radial-gradient(100% 162.15% at 0% 0%, rgba(255, 255, 255, 0.49) 0%, rgba(255, 255, 255, 0.07) 100%)",
            boxSizing: "border-box",
            boxShadow: "inset 0px 0px 60px rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "0px 0px 15px 0px",
            textAlign: "left",
            flex: "1",
          }}
        >
          <div style={{ marginLeft: "5px" }}>{idea.content}</div>
        </div>
      </div>
    </React.Fragment>
  );
  return <React.Fragment>{element}</React.Fragment>;
};
