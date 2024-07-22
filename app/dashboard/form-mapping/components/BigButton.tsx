import React from "react";
import { primary45 } from "../utils/colors";
import useHover from "../hooks/useHover";

interface BigButtonProps{
  title:any
  onClick?:any
  inverted?:any
  fullWidth?:any
  customFillColor?:any
  customWhiteColor?:any
  style?:any
  noHover?:any
  id?:any
  small?:any
  disabled?:any
  marginRight?:any
}
export function BigButton({
  title,
  onClick,
  inverted,
  fullWidth,
  customFillColor,
  customWhiteColor,
  style,
  noHover,
  id,
  small,
  disabled,
  marginRight,
}:BigButtonProps) {
  const [hoverRef, isHovered] = useHover();

  let fillColor = customFillColor || primary45;
  const whiteColor = customWhiteColor || "#FFF";

  let initialBg = null;
  let hoverBg = fillColor;

  let initialColor = fillColor;
  let hoverColor = whiteColor;

  if (inverted) {
    initialBg = fillColor;
    hoverBg = null;
    initialColor = whiteColor;
    hoverColor = fillColor;
  }

  if (disabled) {
    initialBg = "#ddd";
    hoverBg = "#ddd";
    fillColor = "#ddd";
  }

  const styles = {
    container: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign:"center",
      width: fullWidth ? "100%" : null,
      lineHeight:"1.2rem",
      backgroundColor: isHovered && !noHover ? hoverBg : initialBg,
      color:
        isHovered && !noHover && !disabled
          ? hoverColor
          : disabled
          ? "#999"
          : initialColor,
      borderRadius: 4,
      padding: small ? "2px 4px" : "6px 8px",
      fontSize: small ? 14 : null,
      border: `1px solid ${fillColor}`,
      cursor: !disabled ? "pointer" : null,
      userSelect: "none",
      boxSizing: "border-box",
      marginRight,
    },
  };

  return (
    <div
      id={id}
      //@ts-ignore
      ref={hoverRef}
      style={{ ...styles.container, ...style }}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      {title}
    </div>
  );
}
