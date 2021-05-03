function blobToDataURL(blob:Blob): Promise<string> {
  return new Promise((fulfil, reject) => {
    var a = new FileReader();
    a.onload = e => {
      if(e.target && e.target.result)
        fulfil(e.target.result as string);
      else
        reject();
    }
    a.readAsDataURL(blob);
  });
}

export async function downloadBlob(blob: Blob) {
  let dataUrl:string = await blobToDataURL(blob);

  let a = document.createElement('a');
  a.download = "Drum Machine Recording";
  a.href = dataUrl;
  a.click();
}
