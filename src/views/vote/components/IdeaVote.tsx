import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { IdeaVoteType } from "../Vote";
import { Idea } from "../../generate/components/Idea";

interface IIdeaVoteProps {
  index: number;
  idea: IdeaVoteType;
  availableVotes: number;
  handleVote: (idea: IdeaVoteType) => void;
}

function handleVoteIcons(votes: number) {
  let icons = [];
  for (let i = 0; i < votes; i++) {
    icons.push(
      <FontAwesomeIcon
        key={i}
        icon={faThumbsUp}
        color="#D35267"
        style={{ float: "left", marginLeft: "5px" }}
      />
    );
  }

  return icons;
}

export const IdeaVote = (props: IIdeaVoteProps) => {
  const { index, idea, availableVotes, handleVote } = props;
  return (
    <>
      <div style={{ height: "22px", marginLeft: "5px" }} key={index}>
        {availableVotes < 1 ? null : (
          <FontAwesomeIcon
            icon={faThumbsUp}
            color="#66707C"
            onClick={() => handleVote(idea)}
            style={{ float: "right" }}
          />
        )}

        {handleVoteIcons(idea.votes)}
      </div>
      <div>
        <Idea idea={idea.idea} index={index} isDraggable={false}></Idea>
      </div>
    </>
  );
};
