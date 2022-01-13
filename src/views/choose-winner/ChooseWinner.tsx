import { height } from "@mui/system";
import { useEffect, useState } from "react";
import { IdeaType } from "../../model/AppTypes";
import { Leaderboard } from "./Leaderboard";
import { PickWinner } from "./PickWinner";
import { ScatterPlot } from "./ScatterPlot";

export const ChooseWinner = () => {
  const [ideas, setIdeas] = useState<IdeaType[]>([]);

  useEffect(() => {
    async function getIdeas() {
      const response = await fetch(
        "http://127.0.0.1:8000/api/ideas/votes_first",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
        }
      );

      let functionIdeas: IdeaType[] = [];

      await response.json().then((ideasJson: any[]) => {
        ideasJson.forEach((idea: any) => {
          functionIdeas.push({
            id: idea.id,
            content: idea.content,
            votes: idea.votes_first,
            criteria1: idea.criteria1,
            criteria2: idea.criteria2,
          });
        });
        setIdeas(functionIdeas);
      });
    }
    getIdeas();
  }, []);

  return (
    <div style={{ width: "40%", margin: "0 auto" }}>
      <Leaderboard ideas={ideas} />
      <ScatterPlot
        width={600}
        height={500}
        top={50}
        right={50}
        bottom={80}
        left={50}
        fill="tomato"
      />
      <PickWinner ideas={ideas} />
    </div>
  );
};
