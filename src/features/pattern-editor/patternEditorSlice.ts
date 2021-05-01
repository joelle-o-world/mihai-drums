import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {drumSampleNames} from '../synth/drums';

export type PatternStep = boolean;


export interface PatternEditorChannelState {
  steps: PatternStep[];
  sampleName: string;
  chokeGroup?: number;
}

function blankChannel(sampleName:string, chokeGroup?:number, numberOfSteps=16) {
  return {
    sampleName,
    steps: new Array(numberOfSteps).fill(false),
    chokeGroup,
  }
}

export interface PatternEditorState {
  channels: PatternEditorChannelState[];
  numberOfSteps: number;
  tempo: number;
  stepsPerBeat: number;
}

export interface StepCoordinate {
  channel: number;
  time: number;
}

const initialState: PatternEditorState = {
  channels: [
    blankChannel('kick'),
    blankChannel('clap'),
    blankChannel('snare'),
    blankChannel('tom'),
    blankChannel('hihat'),
    blankChannel('shaker'),
    blankChannel('bongo'),
    blankChannel('cowbell'),
    blankChannel('kelela_mihai', 1),
    blankChannel('mihai2', 1),
    blankChannel('mihai3', 1),
    blankChannel('mihai4', 1),
    blankChannel('mihai5', 1),
    blankChannel('mihai6', 1),
    blankChannel('mihai7', 1),
  ],
  numberOfSteps: 16,
  tempo: 137,
  stepsPerBeat: 4,
}

export const patternEditorSlice = createSlice({
  name: "patternEditor",
  initialState,
  
  reducers: {
    switchOffStep: (state, action: PayloadAction<StepCoordinate>) => {
      const {time, channel} = action.payload;
      let row = state.channels[channel];
      if(row) 
        row.steps[time] = false;
      // TODO: handle out of bounds error
    },

    switchOnStep: (state, action: PayloadAction<StepCoordinate>) => {
      const {time, channel} = action.payload;
      let row = state.channels[channel];
      if(row) 
        row.steps[time] = true;
      // TODO: handle out of bounds error
    },

    toggleStep: (state, action: PayloadAction<StepCoordinate>) => {
      const {time, channel} = action.payload;
      let row = state.channels[channel];
      if(row) 
        row.steps[time] = !row.steps[time];
      // TODO: handle out of bounds error
    },
  },
});

export default patternEditorSlice.reducer;

export const selectPatternEditor = (state: RootState) => state.patternEditor;

export const {toggleStep} = patternEditorSlice.actions;
