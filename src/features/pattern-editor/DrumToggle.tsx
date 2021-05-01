import classNames from 'classnames';
import React, {FunctionComponent} from 'react';

export interface DrumToggleProps {
  value: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DrumToggle:FunctionComponent<DrumToggleProps> = ({value, onClick}) => {
  return <button 
    onClick={onClick}
    className={classNames("DrumToggle", {
      switchedOn: value, 
      switchedOff: !value,
    })}
  ></button>
}
