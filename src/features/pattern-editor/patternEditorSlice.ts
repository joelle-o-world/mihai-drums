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
    blankChannel('hihat', 12),
    blankChannel('open_hat', 12),
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

      if(row.chokeGroup !== undefined) {
        for(let c=0; c < state.channels.length; ++c) {
          if(c === channel)
            continue;

          if(state.channels[c].chokeGroup === row.chokeGroup)
            state.channels[c].steps[time] = false
        }
      }
      // TODO: handle out of bounds error
    },

    doublePattern: state => ({
      ...state,
      numberOfSteps: state.numberOfSteps*2,
      channels: state.channels.map(channel => ({
        ...channel,
        steps: channel.steps.concat(channel.steps)
      })),
    }),

    setTempo: (state, action:PayloadAction<number|string>) => {
      let val = Number(action.payload)
      if(!isNaN(val) && val > 0)
        state.tempo = val
    },

    incrementTempo: (state, action:PayloadAction<number|string|undefined>) => {
      let val = state.tempo + Number(action.payload || 3)
      if(!isNaN(val) && val > 0)
        state.tempo = val;
    },
    decrementTempo: (state, action:PayloadAction<number|string|undefined>) => {
      let val = state.tempo - Number(action.payload || 3)
      if(!isNaN(val) && val > 0)
        state.tempo = val;
    },

    clearPattern: state => {
      for(let channel of state.channels)
        channel.steps = new Array(16).fill(false)
      state.numberOfSteps = 16
    },
  },
});

export default patternEditorSlice.reducer;

export const selectPatternEditor = (state: RootState) => state.patternEditor;

export const {toggleStep, doublePattern, setTempo, incrementTempo, decrementTempo, clearPattern} = patternEditorSlice.actions;
