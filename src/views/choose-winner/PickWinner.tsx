import { Button } from "@mui/material";
import { useState } from "react";
import { IdeaType } from "../../model/AppTypes";

export const PickWinner = () => {
  const [selectedId, setSelectedId] = useState(-1);
  let test: IdeaType[] = [
    { ideaId: 2, content: "Meme" },
    { ideaId: 3, content: "Test" },
    { ideaId: 4, content: "Via" },
    { ideaId: 5, content: "Dea" },
  ];
  return (
    <div style={{ width: "40%" }}>
      <h2>Select a winner</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 3fr)",
          columnGap: "25%",
          rowGap: "30px",
        }}
      >
        {test.map((idea) => (
          <div
            key={idea.ideaId}
            style={{
              height: "60px",
              background: "red",
              textAlign: "center",
              lineHeight: "60px",
              borderRadius: "15px",
              border: selectedId === idea.ideaId ? "1px solid blue" : "1px solid #DADADA"
            }}
            onClick={() => setSelectedId(idea.ideaId)}
          >{idea.content}</div>
        ))}
      </div>
      <div style={{ textAlign: "center", paddingTop: "10px" }}>
        <Button variant="contained" color="secondary">
          Vote
        </Button>
      </div>
    </div>
  );
};
