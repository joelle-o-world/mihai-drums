import React, {FunctionComponent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectSynth} from '../synth/synthSlice';
import {selectPatternEditor, toggleStep} from './patternEditorSlice';
import classNames from 'classnames';

import './PatternEditor.sass'
import {DrumToggle} from './DrumToggle';
import {playDrums} from '../synth/synth';

export const PatternEditor: FunctionComponent = () => {
  const state = useSelector(selectPatternEditor)
  const {nowPlayingStep, playing} = useSelector(selectSynth);
  const dispatch = useDispatch();

  return <table className="PatternEditor">
    <tbody>
    {state.channels.map((channel, c) => (
      <tr key={c} className="PatternEditorChannel">
        <th className="PatternEditorSampleName">
          <span>
            {channel.sampleName}
          </span>
        </th>
        {channel.steps.map( (step, t) => (
          <td 
            key={t} 
            className={classNames(
              "PatternEditorStep",
              {
                nowPlayingStep: nowPlayingStep===t,
                switchedOn: step,
              }
            )}
          >
            <DrumToggle 
              value={step} 
              onMouseDown={() => dispatch(toggleStep({
                channel: c,
                time: t,
              }))} 
              onMouseOver={e => {
                if(e.buttons === 1)
                  dispatch(toggleStep({channel: c, time: t}));
                else
                  if(step && !playing)
                    playDrums([channel.sampleName], -1)
              }}
            />
          </td>
        ))}
      </tr>)
      )}
    </tbody>
  </table>
}
