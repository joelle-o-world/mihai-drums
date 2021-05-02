import React from 'react';
import logo from './logo.svg';
import './App.sass'
import {PatternEditor} from './features/pattern-editor/PatternEditor';
import {PlayButton} from './features/synth/PlaybackButtons';
import {DoublePatternButton} from './features/pattern-editor/DoublePatternButton';
import {TempoButtonInput} from './features/pattern-editor/TempoInput';
import ClearPatternButton from './features/pattern-editor/ClearPatternButton';

function App() {
  return (
    <div className="App">
      <div className="Controls">
        <hgroup className="AppHeader">
          <h1>MIHAI</h1>
          <h2>MPC2000</h2>
        </hgroup>
        <PlayButton loop/>
        <TempoButtonInput />
        <ClearPatternButton/>
      </div>
      <div className="PatternEditorWrapper">
        <PatternEditor/>
      </div>
    </div>
  );
}

export default App;
