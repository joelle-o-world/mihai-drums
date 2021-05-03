import React, {FunctionComponent} from 'react';
import classNames from 'classnames'
import {playRandomButtonSound} from '../features/sound-effects/sfx';

export interface PushButtonProps { 
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  //onPush: (e:React.MouseEvent<HTMLButtonElement>) => void;
}

export const PushButton: FunctionComponent<PushButtonProps> = ({children, onClick, className}) => {
  return <span  className={classNames("PushButton", className)}>
    <label>{children}</label>
    <button  onClick={e => {
      playRandomButtonSound()
      if(onClick)
        onClick(e);
    }} />
  </span>
}

export default PushButton;
