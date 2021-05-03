import clap from './drum-samples/mastered/clap.mp3'
import kick from './drum-samples/mastered/kick.mp3'
import bongo from './drum-samples/mastered/bongo.mp3';
import snare from './drum-samples/mastered/snare.mp3';
import hihat from './drum-samples/mastered/hihat.mp3';
import open_hat from './drum-samples/mastered/hihat-open.mp3';
import tom from './drum-samples/Tom-909-Hi.aif.mp3';
import cowbell from './drum-samples/mastered/cowbell.mp3';
import shaker from './drum-samples/mastered/shaker.mp3';
import kelela_mihai from './drum-samples/mastered/mihai1.mp3';
import mihai2 from './drum-samples/mastered/mihai2.mp3';
import mihai3 from './drum-samples/mastered/mihai3.mp3';
import mihai4 from './drum-samples/mastered/mihai4.mp3';
import mihai5 from './drum-samples/mastered/mihai5.mp3';
import mihai6 from './drum-samples/mastered/mihai6.mp3';
import mihai7 from './drum-samples/mastered/mihai7.mp3';

import loadAudioBuffer from '../../loadAudioBuffer';

const audioFiles: {[name:string]: string} = { 
  kick,
  clap, 
  snare, 
  hihat, 
  open_hat,
  bongo, 
  cowbell, 
  shaker ,
  kelela_mihai,
  mihai2,
  mihai3,
  mihai4,
  mihai5,
  mihai6,
  mihai7,
}

export const drumSampleNames = Object.keys(audioFiles);


export const drumBuffers:{[name: string]: AudioBuffer|'pending'|'loading'|undefined}  = {
}
for(let name in audioFiles)
  drumBuffers[name] = 'pending';

export async function loadDrumBuffers(ctx: AudioContext) {
  const promises: Promise<void>[] = [];
  for(let name in audioFiles) {
    const url = audioFiles[name];
    drumBuffers[name] = 'loading';
    promises.push(
      loadAudioBuffer(url, ctx).then(audiobuffer => {
        drumBuffers[name] = audiobuffer;
      })
    );
  }

  await Promise.all(promises);

  return drumBuffers
}

export default drumBuffers;


export interface DrumParse {
  str: string;
  hasDrums: boolean;
  drums: string[];
}
export function parseDrum(str: string) {
  let tidied = str.toLowerCase().trim();
  if(drumBuffers[tidied])
    return {
      str,
      hasDrums: true,
      drums: [tidied],
    }
  else
    return {
      str,
      hasDrums: false,
      drums: [],
    }
}
