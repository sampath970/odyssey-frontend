import React from 'react';
import Label, { LabelType, LabelVariant } from '../label/label';
import "./file-download-link.scss"
function FileDownloadLink({filePath }) {
  const FILE_URL = filePath;
  const fileName = filePath.split('/').pop();
  const handleDownload = (url) =>{
    console.log(url)
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.setAttribute("download",fileName)
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  }
  return (
    <div className='file-download-link' style={{display:"flex"}}>
      <div className='file-download-link__text'>Click to download : </div>
      <Label onLabelClick={()=>handleDownload(FILE_URL)} type={LabelType.SubLink} text={fileName} variant={LabelVariant.L5} overrideTextStyles={{cursor:"pointer",color:"blue",textDecoration:"underline"}}></Label>
    </div>
  );
}

export default FileDownloadLink;