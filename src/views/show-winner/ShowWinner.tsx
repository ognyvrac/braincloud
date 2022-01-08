import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

export const ShowWinner = () => {
  return (
    <div style={{width: "40%", textAlign: "center"}}>
      <FontAwesomeIcon icon={faTrophy} transform="grow-80" color="#851C54" style={{paddingBottom: "20px"}}/>
      <h2>Winner: Test</h2>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <Button variant="contained" color="success">
            Start new cycle
          </Button>
        </div>
        <div style={{ flex: "1" }}>
          <Button variant="contained" color="error">Exit</Button>
        </div>
      </div>
    </div>
  );
};
