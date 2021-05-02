import React, {FunctionComponent} from 'react';
import classNames from 'classnames'

export interface PushButtonProps { 
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;

  //onPush: (e:React.MouseEvent<HTMLButtonElement>) => void;
}

export const PushButton: FunctionComponent<PushButtonProps> = ({children, onClick, className}) => {
  return <span  className={classNames("PushButton", className)}>
    <label>{children}</label>
    <button onClick={onClick} />
  </span>
}

export default PushButton;
