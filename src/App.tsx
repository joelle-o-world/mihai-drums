import React from 'react';
import logo from './logo.svg';
import './App.sass'
import {PatternEditor} from './features/pattern-editor/PatternEditor';
import {PlayButton} from './features/synth/PlaybackButtons';

function App() {
  return (
    <div className="App">
      <PatternEditor/>
      <PlayButton loop/>
    </div>
  );
}

export default App;
