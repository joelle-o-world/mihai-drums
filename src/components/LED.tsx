import classNames from 'classnames';
import React, {FunctionComponent} from 'react';
import './LED.sass'

export const LED:FunctionComponent<{
  turnedOn?: boolean;
}> = ({turnedOn=false}) => {
  return <span 
    className={classNames('LED', turnedOn ? 'turnedOn' : 'turnedOff')}
  />
}
