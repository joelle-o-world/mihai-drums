import React, {FunctionComponent} from 'react';
import {useDispatch} from 'react-redux';
import PushButton from '../../components/PushButton';
import {clearPattern} from './patternEditorSlice';


export const ClearPatternButton:FunctionComponent = () => {
  const dispatch = useDispatch()
  return <PushButton onClick={() => dispatch(clearPattern())} > Clear Pattern</PushButton>
}

export default ClearPatternButton
