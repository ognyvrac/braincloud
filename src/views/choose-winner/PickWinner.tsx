import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IdeaType } from "../../model/AppTypes";

export const PickWinner = ({ ideas }: { ideas: IdeaType[] }) => {
  const [selectedId, setSelectedId] = useState(-1);
  let navigate = useNavigate();

  async function voteWinner() {
    await fetch("http://127.0.0.1:8000/api/ideas/votes_second/" + selectedId, {
      method: "POST",
      mode: "cors",
    });
    navigate("/winner");
  }

  return (
    <div>
      <h2>Select a winner</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 3fr)",
          columnGap: "25%",
          rowGap: "30px",
        }}
      >
        {ideas.map((idea) => (
          <div
            key={idea.id}
            style={{
              height: "60px",
              background: "white",
              textAlign: "center",
              lineHeight: "60px",
              borderRadius: "15px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              border:
                selectedId === idea.id
                  ? "1px solid #5B1467"
                  : "1px solid #DADADA",
            }}
            onClick={() => setSelectedId(idea.id)}
          >
            {idea.content}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", paddingTop: "10px" }}>
        <Button variant="contained" color="secondary" onClick={voteWinner}>
          Vote
        </Button>
      </div>
    </div>
  );
};
