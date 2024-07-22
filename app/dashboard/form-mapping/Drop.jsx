import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./drop.scss";

export default function Drop({ onLoaded }) {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    onLoaded(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    acceptedFiles: "application/pdf"
  });

  return (
    <div {...getRootProps()} className="drop-container">
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop a PDF here</p> : <p>Drag a PDF here</p>}
    </div>
  );
}
