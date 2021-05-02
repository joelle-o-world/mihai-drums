import clap from './drum-samples/Clap-808.aif.mp3';
import kick from './drum-samples/Kick FutureProof.wav.mp3'
import bongo from './drum-samples/Bongo-C78-Low.aif.mp3';
import snare from './drum-samples/Snare-707-b.aif.mp3';
import hihat from './drum-samples/Hihat Sharp Closed.aif.mp3';
import tom from './drum-samples/Tom-909-Hi.aif.mp3';
import cowbell from './drum-samples/Cowbell-808.aif.mp3';
import shaker from './drum-samples/Maracas-808.aif.mp3';
import kelela_mihai from './drum-samples/kelela.mp3';
import mihai2 from './drum-samples/mihai2.mp3';
import mihai3 from './drum-samples/mihai3.mp3';
import mihai4 from './drum-samples/mihai4.mp3';
import mihai5 from './drum-samples/mihai5.mp3';
import mihai6 from './drum-samples/mihai6.mp3';
import mihai7 from './drum-samples/mihai7.mp3';

import loadAudioBuffer from '../../loadAudioBuffer';

const audioFiles: {[name:string]: string} = { 
  kick,
  clap, 
  snare, 
  hihat, 
  tom, 
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
