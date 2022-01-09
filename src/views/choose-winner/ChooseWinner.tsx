import { height } from "@mui/system";
import { Leaderboard } from "./Leaderboard";
import { PickWinner } from "./PickWinner";
import { ScatterPlot } from "./ScatterPlot";

export const ChooseWinner = () => {
  return (
    <div style={{width: "40%", margin: "0 auto"}}>
      <Leaderboard />
      <ScatterPlot
        width={600}
        height={500}
        top={50}
        right={50}
        bottom={80}
        left={50}
        fill="tomato"
      />
      <PickWinner />
    </div>
  );
}
