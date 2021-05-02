import React, {FunctionComponent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PushButton from '../../components/PushButton';
import {decrementTempo, incrementTempo, selectPatternEditor, setTempo} from './patternEditorSlice';

export const TempoRangeInput: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {tempo} = useSelector(selectPatternEditor);

  return <div className="SequencerTempo">
    <span>
      <input 
        value={tempo} 
        onChange={e => dispatch(setTempo(e.target.value))}
        onFocus={e => e.target.select()}
        className="SequencerTempoInput"
        type="number"
      />
      {"bpm"}
    </span>
    <input type="range" min="50" max="300" value={tempo} onChange={e => dispatch(setTempo(e.target.value))} />
  </div>
}

export const TempoInput: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {tempo} = useSelector(selectPatternEditor);

  return <input 
    value={tempo} 
    onChange={e => dispatch(setTempo(e.target.value))}
    onFocus={e => e.target.select()}
    className="TempoInput"
    //type="number"
  />
}

export const IncrementTempoButton: FunctionComponent = () => {
  const dispatch = useDispatch()
  return <PushButton 
    onClick={() => dispatch(incrementTempo())}
  >+</PushButton>
}

export const DrecrementTempoButton: FunctionComponent = () => {
  const dispatch = useDispatch();
  return <PushButton
    onClick={() => dispatch(decrementTempo())}
  >-</PushButton>
}

export const TempoButtonInput: FunctionComponent = () => (
  <div className="TempoButtonInput">
    <h3 className="LineThrough">Tempo</h3>
    <div>
      <TempoInput/>
      <DrecrementTempoButton/>
      <IncrementTempoButton />
    </div>
  </div>
);
