import React, {FunctionComponent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IoPlaySharp, IoStopSharp} from 'react-icons/io5';
import {synthPlay, selectSynth, stopPlaying, unloop} from './synthSlice';
import {ImLoop} from 'react-icons/im/'
import {PushButton} from '../../components/PushButton';

export const PlayButton: FunctionComponent<{loop?:boolean}> = ({loop=false}) => {
  const dispatch = useDispatch();
  const {playing} = useSelector(selectSynth);
  if(!playing)
    return <PushButton className="PlaybackButton PlayButton" onClick={() => dispatch(synthPlay(loop))}><IoPlaySharp/>Play</PushButton>
  else
    return <PushButton className="PlaybackButton StopButton" onClick={() => dispatch(stopPlaying())}><IoStopSharp/>Stop</PushButton>
}

export const LoopButton: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {looping} = useSelector(selectSynth);
  if(looping)
    return <PushButton className="PlaybackButton UnloopButton" onClick={() => dispatch(unloop())}>Un-Loop</PushButton>
  else
    return <PushButton className="PlaybackButton LoopButton" onClick={() => dispatch(synthPlay(true))}><ImLoop/>Loop</PushButton>
}

export const PlaybackButtons: FunctionComponent = () => <>
  <PlayButton loop/>
</>
