import React, { useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ResizableBox, ResizeCallbackData } from "react-resizable";
import "react-resizable/css/styles.css";

interface DraggableSignatureProps {
  url?: string;
  onEnd?: (e: DraggableEvent, data: DraggableData) => void;
  onSet?: () => void;
  onCancel?: () => void;
}

const DraggableSignature: React.FC<DraggableSignatureProps> = ({
  url,
  onEnd,
  onSet,
  onCancel,
}) => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 100000,
    border: `2px solid black`,
  };

  const controlsStyle: React.CSSProperties = {
    position: "absolute",
    right: 0,
    display: "flex",
    flexDirection: "column",
  };

  const resizableStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleResize = (
    _event: React.SyntheticEvent,
    { size }: ResizeCallbackData
  ) => {
    setHeight(size.height);
    setWidth(size.width);
  };

  const handleSet = () => {
    console.log("Set button clicked");
    if (onSet) {
      onSet();
    }
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Draggable onStop={onEnd}>
      <div style={containerStyle}>
        <div style={controlsStyle}>
          <div onClick={handleSet}>
            <FaCheck color={"dodgerblue"} />
          </div>
          <div onClick={handleCancel}>
            <FaTimes color={"tomato"} />
          </div>
        </div>
        <ResizableBox
          width={width}
          height={height}
          onResize={handleResize}
          style={resizableStyle}
        >
          <img
            src={url}
            style={{ width: width + "px", height: height + "px", resize: "both" }}
            draggable={false}
            alt="Signature"
          />
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default DraggableSignature;
