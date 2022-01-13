import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const ShowWinner = () => {
  const [winner, setWinner] = useState("");

  useEffect(() => {
    async function getWinner() {
      const response = await fetch("http://127.0.0.1:8000/api/ideas/winner", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      });

      await response.json().then((winner: any) => {
        setWinner(winner.content);
      });
    }
    getWinner();
  }, []);

  return (
    <div style={{ textAlign: "center", paddingTop: "3em" }}>
      <FontAwesomeIcon
        icon={faTrophy}
        transform="grow-80"
        color="#851C54"
        style={{ paddingBottom: "20px" }}
      />
      <h2>Winner: {winner}</h2>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Button variant="contained" color="success">
            Start new cycle
          </Button>
        </div>
        <div style={{ flex: "1" }}>
          <Button variant="contained" color="error">
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
};
