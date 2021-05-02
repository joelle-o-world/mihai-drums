import React, {FunctionComponent} from 'react'
import {useDispatch} from 'react-redux';
import {doublePattern} from './patternEditorSlice';
import PushButton from '../../components/PushButton';

export const DoublePatternButton:FunctionComponent = () => {
  const dispatch = useDispatch();
  return <PushButton onClick={() => dispatch(doublePattern())}>+ add more steps</PushButton>
}
