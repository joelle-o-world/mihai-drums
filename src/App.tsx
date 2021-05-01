import React from 'react';
import logo from './logo.svg';
import './App.sass'
import {PatternEditor} from './features/pattern-editor/PatternEditor';
import {PlayButton} from './features/synth/PlaybackButtons';

function App() {
  return (
    <div className="App">
      <hgroup className="AppHeader">
        <h1>MIHAI</h1>
        <h2>MPC200</h2>
      </hgroup>
      <PatternEditor/>
      <PlayButton loop/>
    </div>
  );
}

export default App;
