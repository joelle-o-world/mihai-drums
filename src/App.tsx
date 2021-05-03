import React from 'react';
import logo from './logo.svg';
import './App.sass'
import {PatternEditor} from './features/pattern-editor/PatternEditor';
import {PlaybackButtons, PlayButton} from './features/synth/PlaybackButtons';
import {DoublePatternButton} from './features/pattern-editor/DoublePatternButton';
import {TempoButtonInput} from './features/pattern-editor/TempoInput';
import ClearPatternButton from './features/pattern-editor/ClearPatternButton';
import AkMihai from './images/akai-mihai.png';
import ToggleHPF from './features/synth/ToggleHPF';

function App() {
  return (
    <div className="App">
      <div className="Controls">
        <hgroup className="AppHeader">
        <h1><img src={AkMihai} alt="MIHAI (styled after the akai logo)"/></h1>
          <h2>MPC2000</h2>
        </hgroup>
        <PlaybackButtons/>
        <TempoButtonInput />
        <ClearPatternButton/>
        <ToggleHPF/>
      </div>
      <div className="PatternEditorWrapper">
        <PatternEditor/>
      </div>
    </div>
  );
}

export default App;
