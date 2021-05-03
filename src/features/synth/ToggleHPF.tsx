import React, {FunctionComponent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LED} from '../../components/LED';
import PushButton from '../../components/PushButton';
import {selectSynth, toggleHPF} from './synthSlice';

export const ToggleHPF: FunctionComponent = () => {
  const dispatch = useDispatch()
  const {hpfRaised} = useSelector(selectSynth)

  return <PushButton
    onClick={() => dispatch(toggleHPF())}
  ><LED turnedOn={hpfRaised}/> high pass filter</PushButton>
}
export default ToggleHPF
