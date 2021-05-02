
export function loadAudioBuffer(url: string, ctx: AudioContext): Promise<AudioBuffer> {
  return new Promise((fulfil, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('get', url);
    xhttp.responseType = 'arraybuffer';
    xhttp.onload = () => {
      let arrayBuffer = xhttp.response;
      ctx.decodeAudioData(
        arrayBuffer,
        buffer => {
          fulfil(buffer);
        },
        err => {
          reject(err);
        }
      )
    }
    xhttp.onerror = err => {
      reject(err)
    };
    xhttp.send();
  });
}

export default loadAudioBuffer;
