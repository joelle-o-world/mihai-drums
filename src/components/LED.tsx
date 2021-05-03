import classNames from 'classnames';
import React, {FunctionComponent} from 'react';
import './LED.sass'

export const LED:FunctionComponent<{
  turnedOn?: boolean;
  blink?: boolean;
}> = ({turnedOn=false, blink=false}) => {
  return <span 
    className={classNames(
      'LED', 
      turnedOn ? 'turnedOn' : 'turnedOff',
      {blink}
    )}
  />
}
