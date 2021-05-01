import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import patternEditorReducer from '../features/pattern-editor/patternEditorSlice';
import synthReducer from '../features/synth/synthSlice';

export const store = configureStore({
  reducer: {
    patternEditor: patternEditorReducer,
    synth: synthReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
