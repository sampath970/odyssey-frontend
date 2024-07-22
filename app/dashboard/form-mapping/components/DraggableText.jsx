// DraggableText.js

import Draggable from "react-draggable";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import "./draggable-text.scss"; // Import the SCSS file
import Close from "../../../../public/assets/icons/close.svg";
import Check from "../../../../public/assets/icons/check-mark.svg";
import Resize from "../../../../public/assets/icons/resize.svg";
const getWidth = (_ques) => {
  console.log(_ques);
  if (_ques?.answer_type === "multi-select" || _ques?.answer_type === "radio") {
    return 10;
  } else {
    return 200;
  }
};
const getHeight = (_ques) => {
  if (_ques?.answer_type === "multi-select" || _ques?.answer_type === "radio") {
    return 10;
  } else {
    return 25;
  }
};
export default function DraggableText({
  onEnd,
  onSet,
  onCancel,
  initialText,
  inputWidth,
  setInputWidth,
  inputHeight,
  setInputHeight,
  currentQuestion,
}) {
  const [text, setText] = useState("");
  const [isResizing, setIsResizing] = useState(true);
  const inputRef = useRef(null);
  const [width, setWidth] = useState(getWidth(currentQuestion));
  const [height, setHeight] = useState(getHeight(currentQuestion));
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [dragTop, setDragTop] = useState(0);
  const [dragLeft, setDragLeft] = useState(0);
  useEffect(()=>{
    let _height = getHeight(currentQuestion);
    setHeight(_height)
    let _width = getWidth(currentQuestion);
    setWidth(_width)
  },[currentQuestion])
  const handleMouseDown = (e) => {
    e.preventDefault();
    const originalWidth = width;
    const originalHeight = height;
    const originalX = e.clientX;
    const originalY = e.clientY;

    const handleMouseMove = (e) => {
      const newWidth = originalWidth + (e.clientX - originalX);
      const newHeight = originalHeight + (e.clientY - originalY);

      setWidth(Math.max(newWidth, 1));
      setHeight(Math.max(newHeight, 1));
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleDrag = (e, ui) => {
    console.log("UI", ui);
    const { x, y } = ui;
    console.log(x);
    console.log(y);
    setLeft(x);
    setTop(y);
  };
  useEffect(() => {
    if (parseFloat(width, 10) > 400) {
      setInputWidth(400);
      setInputHeight(400);
    } else if (parseFloat(width, 10) < 10) {
      setInputWidth(10);
      setInputHeight(10);
    } else {
      setInputWidth(parseFloat(width, 1));
      setInputHeight(parseFloat(height, 1));
    }
  }, [width, height]);
  useEffect(() => {
    if (initialText) {
      setText(initialText);
    } else {
      inputRef.current?.select();
      inputRef.current?.focus();
    }
  }, [initialText]);
  console.log(isResizing);
  console.log(text);
  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      const newHeight = e.clientY;

      // Limit the width to a maximum of 400px
      const maxWidth = 400;
      const limitedWidth = Math.min(newWidth, maxWidth);

      setWidth(`${limitedWidth}px`);
      setHeight(`${newHeight}px`);
    }
  };
  console.log(height);
  console.log(width);
  const handleMouseUp = () => {
    setIsResizing(false);
  };
  console.log(dragLeft);
  console.log(dragTop);
  return isResizing ? (
    <div
      className="draggable-text"
      onMouseDown={handleMouseDown}
      style={{ width, height, transform: "none" }}
    >
      <div
        className="resizable"
        style={{
          position: "absolute",
          width: `${width}px`,
          height: `${height}px`,
          background: "white",
          top,
          left,
        }}
      >
        <div className="resizers">
          <div ref={inputRef}>{text}</div>
          <div
            className="resizer top-left"
            onMouseDown={handleMouseDown}
            style={{ display: "none" }}
          ></div>
          <div
            className="resizer top-right"
            onMouseDown={handleMouseDown}
            style={{ display: "none" }}
          ></div>
          <div
            style={{ display: "none" }}
            className="resizer bottom-left"
            onMouseDown={handleMouseDown}
          ></div>
          <div
            className="resizer bottom-right"
            onMouseDown={handleMouseDown}
          ></div>
          <div className="draggable-text__controls">
            <div className="draggable-text__small-button" onClick={onCancel}>
              <div className="drag-icon-wrapper">
                <Close width={8} height={8} />
              </div>
            </div>
            <div className="resize-icon">
              <Resize
                width={12}
                height={12}
                onClick={() => {
                  setIsResizing(false);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        position: "relative",
        transform: "none",
        zIndex: 11,
        background: "yellow",
      }}
    >
      <Draggable onStop={onEnd} onDrag={handleDrag}>
        <div
          className="draggable-text"
          style={{
            width,
            height,
            left: dragLeft,
            top: dragTop,
            transform: "none",
          }}
        >
          <div
            style={{ height }}
            ref={inputRef}
            className="draggable-text__input"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
          >
            {text}
          </div>
          {/* <div className="draggable-text__input" ref={inputRef}>{text}</div> */}
          <div className="draggable-text__controls">
            <div
              className="draggable-text__small-button"
              onClick={() => {
                onSet(text);
              }}
            >
              <div className="drag-check-wrapper">
                <Check />
              </div>
            </div>
            <div className="draggable-text__small-button" onClick={onCancel}>
              <div className="drag-icon-wrapper">
                <Close width={8} height={8} />
              </div>
            </div>
            <div className="resize-icon">
              <Resize
                width={12}
                height={12}
                onClick={() => {
                  setDragTop(top);
                  setDragLeft(left);
                  setIsResizing(true);
                }}
              />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}
