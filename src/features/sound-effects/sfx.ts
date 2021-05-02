import loadAudioBuffer from '../../loadAudioBuffer';

import buttonSound1 from './audio/multimedia_button_click_003.mp3'
import buttonSound2 from './audio/multimedia_button_click_024.mp3'
import buttonSound3 from './audio/zapsplat_multimedia_button_click_fast_plastic_49161.mp3';
import buttonSound4 from './audio/zapsplat_household_fan_button_press_002_13850.mp3'
import buttonSound5 from './audio/technology_laptop_notebook_return_or_enter_key_press.mp3'

export const buttonSounds: AudioBuffer[] = [];

// @ts-ignore
const AudioContext = (window.AudioContext || window.webkitAudioContext);
const ctx = new AudioContext();

const buttonFxGain = ctx.createGain();
buttonFxGain.gain.value = .02;
buttonFxGain.connect(ctx.destination);

const buttonSoundFiles = [
  buttonSound1,
  buttonSound2,
  buttonSound3,
  buttonSound4, 
  buttonSound5,
];

let buttonSoundsLoaded = false;
export function loadButtonSounds() {
  if(buttonSoundsLoaded)
    return ;
  else {
    for(let file of buttonSoundFiles)
      loadAudioBuffer(file, ctx).then(
        audiobuffer => {
          buttonSounds.push(audiobuffer)
        }
      )
  }
}
loadButtonSounds();

export function playRandomButtonSound() {
  if(ctx.state !== 'running')
    ctx.resume();

  if(buttonSounds.length) {
    let buffer = buttonSounds[Math.floor(Math.random()*buttonSounds.length)];

    let source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(buttonFxGain);
    source.start();

    console.log('played button sound');
  }
}
