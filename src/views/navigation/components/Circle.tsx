import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as regularCircle } from "@fortawesome/free-regular-svg-icons";
import {
  ColorState,
  decideColor,
  IconState,
  decideIcon,
} from "../../../model/StateEnum";

interface CircleProps {
  icon: IconState;
  state: ColorState;
}

/// This components provides a generic implementation of the
export const Circle = ({ icon, state }: CircleProps) => {
  return (
    <React.Fragment>
      <div className="fa-2x" style={{textAlign: "center"}}>
        <span className="fa-layers fa-fw ">
          {/* Outline circle */}
          {(state === ColorState.InProgress ||
            state === ColorState.Inactive) && (
            <FontAwesomeIcon
              icon={regularCircle}
              color={state === ColorState.InProgress ? "#851C54" : "#BFC1C6"}
              transform="grow-13"
            />
          )}
          {/* Inner circle */}
          {(state === ColorState.InProgress || state === ColorState.Done) && (
            <div>
              <FontAwesomeIcon
                icon={faCircle}
                transform="grow-5"
                color={decideColor(state)}
              />
            </div>
          )}
          {/* Icon */}
          <FontAwesomeIcon
            icon={decideIcon(icon)}
            color={state === ColorState.Inactive ? "#BFC1C6" : "white"}
            transform="shrink-6"
          />
        </span>
      </div>
    </React.Fragment>
  );
};
