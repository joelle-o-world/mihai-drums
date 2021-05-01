import React, {FunctionComponent} from 'react';
import classNames from 'classnames'

export interface PushButtonProps { 
  onClick?: (e:React.MouseEvent<HTMLSpanElement>) => void;
  className?: string;

  //onPush: (e:React.MouseEvent<HTMLButtonElement>) => void;
}

export const PushButton: FunctionComponent<PushButtonProps> = ({children, onClick, className}) => {
  return <span onClick={onClick} className={classNames("PushButton", className)}>
    <label>{children}</label>
    <button />
  </span>
}
