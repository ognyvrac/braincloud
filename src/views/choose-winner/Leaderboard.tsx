import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export const Leaderboard = () => {
  return (
    <React.Fragment>
      <div style={{ width: "50%" }}>
        <div>
          <h2>Leaderboard</h2>
          <div style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}>
            <div>Idea</div>
            <div style={{alignSelf: "center"}}>
              <FontAwesomeIcon icon={faThumbsUp} color="#D35267" />
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}>
          <div>Create prototype</div>
          <div>2</div>
          <div>Create prototype</div>
          <div>2</div>
          <div>Create prototype</div>
          <div>2</div>
        </div>
      </div>
    </React.Fragment>
  );
};
