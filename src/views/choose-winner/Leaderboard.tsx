import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { IdeaType } from "../../model/AppTypes";

export const Leaderboard = ({ ideas }: { ideas: IdeaType[] }) => {
  return (
    <React.Fragment>
      <div>
        <div
          style={{
            background:
              "radial-gradient(100% 162.15% at 0% 0%, rgba(255, 255, 255, 0.49) 0%, rgba(255, 255, 255, 0.07) 100%)",
            boxShadow: "inset 0px 0px 60px rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(12px)",
            borderRadius: "15px 15px 0px 0px",
            paddingTop: "5vh",
            color: "white",
          }}
        >
          <h2 style={{ paddingLeft: "2vh", marginBottom: "3vh" }}>
            Leaderboard
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 0.4fr",
              paddingLeft: "2vh",
            }}
          >
            <div>Idea</div>
            <div>
              <FontAwesomeIcon icon={faThumbsUp} color="#D35267" />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 0.35fr",
            paddingLeft: "2vh",
            rowGap: "1em",
            background: "rgba(255, 255, 255, 0.53)",
            boxShadow: "inset 0px 0px 60px rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(12px)",
            borderRadius: "0px 0px 15px 15px",
            paddingBottom: "2vh",
          }}
        >
          {ideas.map((idea, index) => {
            return (
              <>
                <div>{index+1 + ". " + idea.content}</div>
                <div>{idea.votes}</div>
              </>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};
