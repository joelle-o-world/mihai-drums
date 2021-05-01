import React, {FunctionComponent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectSynth} from '../synth/synthSlice';
import {selectPatternEditor, toggleStep} from './patternEditorSlice';
import classNames from 'classnames';

import './PatternEditor.sass'
import {DrumToggle} from './DrumToggle';

export const PatternEditor: FunctionComponent = () => {
  const state = useSelector(selectPatternEditor)
  const {nowPlayingStep} = useSelector(selectSynth);
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
            onClick={() => dispatch(toggleStep({
              channel: c,
              time: t,
            }))} 
            onMouseOver={e => e.buttons === 1 && dispatch(toggleStep({
              channel: c,
              time: t,
            }))}
          >
            <DrumToggle 
              value={step} 
            />
          </td>
        ))}
      </tr>)
      )}
    </tbody>
  </table>
}
