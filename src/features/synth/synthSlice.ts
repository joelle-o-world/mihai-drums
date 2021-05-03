import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState, AppThunk} from "../../app/store";
import {downloadBlob} from "../../downloadFile";
import {playSequence, getPersistantSynth} from './synth';

export interface SynthState {
  playing: boolean;
  looping: boolean;
  nowPlayingStep: number | null;
  recording: boolean;
}

const initialState: SynthState = {
  playing: false,
  looping: false,
  recording: false,
  nowPlayingStep: null,
}

export const synthSlice = createSlice({
  name: 'synth',
  initialState,
  reducers: {
    startPlaying: state => {
      state.playing = true;
      state.looping = false;
    },
    startLooping: state => {
      state.playing = true;
      state.looping = true;
    },
    stopPlaying: state => {
      state.playing = false;
      state.looping = false;
      state.nowPlayingStep = null;
    },
    unloop: state => {
      state.looping = false;
    },
    setNowPlayingStep: (state, action:PayloadAction<number>) => {
      state.nowPlayingStep = action.payload;
    },
    finishedPlaying: state => {
      state.playing = false;
      state.looping = false;
      state.nowPlayingStep = null;
    },
    startedRecording: state => {
      state.recording = true;
    },
    finishedRecording: state => {
      state.recording = false;
    }
  },
});

export const {startLooping, stopPlaying, startPlaying, setNowPlayingStep, finishedPlaying, unloop, startedRecording, finishedRecording} = synthSlice.actions;
export default synthSlice.reducer
export const selectSynth = (state: RootState) => state.synth;

export const synthPlay = (looping=false): AppThunk => async (dispatch, getState) => {
  let wasPlaying = getState().synth.playing;
  if(looping)
    dispatch(startLooping())
  else
    dispatch(startPlaying())

  if(wasPlaying)
    return ;

  const sequence = getState().patternEditor;
  const {events, updateSequence, setLooping, stop} = playSequence(sequence, {looping})

  events.on('step', n => dispatch(setNowPlayingStep(n))) 
  events.on('schedule', () => {
    let state = getState();
    updateSequence(state.patternEditor);
    setLooping(state.synth.looping)
    if(!state.synth.playing)
      stop();
  })
  events.on('finish', () => {
    dispatch(finishedPlaying());
  })
}


export const startRecording = (): AppThunk => (dispatch, getState) => {
  const synth = getPersistantSynth();
  let recorder = synth.startRecording();

  recorder.ondataavailable = (e: any) => {
    downloadBlob(e.data)
  }

  dispatch(startedRecording())

  if(!getState().synth.playing)
    dispatch(synthPlay(true));

  let interval = setInterval(() => {
    let state = getState();
    if(!state.synth.playing) {
      recorder.stop();
      clearInterval(interval);
      dispatch(finishedRecording());
    }
  }, 1000);
}
