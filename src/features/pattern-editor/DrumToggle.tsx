import classNames from 'classnames';
import React, {FunctionComponent} from 'react';

export interface DrumToggleProps {
  value: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DrumToggle:FunctionComponent<DrumToggleProps> = ({value, onClick, onMouseOver, onMouseDown}) => {
  return <button 
    onClick={onClick}
    className={classNames("DrumToggle", {
      switchedOn: value, 
      switchedOff: !value,
    })}
    onMouseDown={onMouseDown}
    onMouseOver={onMouseOver}
  ></button>
}
