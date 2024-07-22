import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./label.scss";

export enum LabelVariant {
  L1 = "l1",
  L2 = "l2",
  L3 = "l3",
  L4 = "l4",
  L5 = "l5",
}

export enum LabelType {
  Hero = "hero",
  Header = "header",
  SubHeader = "sub-header",
  Body = "body",
  Link = "link",
  SubLink = "sub-link",
}

interface LabelProps {
  type: LabelType;
  variant: LabelVariant;
  text?: any;
  overrideTextStyles?: object;
  dataTestId?: string;
  onLabelClick?:()=>void;
}

const Label = (props: LabelProps) => {
  const { type, variant, text, overrideTextStyles = {}, dataTestId,onLabelClick } = props;
  const fontStyle = classNames({
    "label-hero-l1": LabelType.Hero == type && variant == LabelVariant.L1,
    "label-header-l1": LabelType.Header == type && variant == LabelVariant.L1,
    "label-subheader-l1":
      LabelType.SubHeader == type && variant == LabelVariant.L1,
    "label-body-l1": LabelType.Body == type && variant == LabelVariant.L1,
    "label-link-l1": LabelType.Link == type && variant == LabelVariant.L1,
    "label-sublink-l1": LabelType.SubLink == type && variant == LabelVariant.L1,
    "label-hero-l2": LabelType.Header == type && variant == LabelVariant.L2,
    "label-header-l2": LabelType.Header == type && variant == LabelVariant.L2,
    "label-subheader-l2":
      LabelType.SubHeader == type && variant == LabelVariant.L2,
    "label-body-l2": LabelType.Body == type && variant == LabelVariant.L2,
    "label-link-l2": LabelType.Link == type && variant == LabelVariant.L2,
    "label-sublink-l2": LabelType.SubLink == type && variant == LabelVariant.L2,
    "label-hero-l3": LabelType.Header == type && variant == LabelVariant.L3,
    "label-header-l3": LabelType.Header == type && variant == LabelVariant.L3,
    "label-subheader-l3":
      LabelType.SubHeader == type && variant == LabelVariant.L3,
    "label-body-l3": LabelType.Body == type && variant == LabelVariant.L3,
    "label-link-l3": LabelType.Link == type && variant == LabelVariant.L3,
    "label-sublink-l3": LabelType.SubLink == type && variant == LabelVariant.L3,
    "label-l1": variant == LabelVariant.L1,
    "label-l2": variant == LabelVariant.L2,
    "label-l3": variant == LabelVariant.L3,
    "label-l4": variant == LabelVariant.L4,
    "label-l5": variant == LabelVariant.L5,
    "label-hero": LabelType.Hero == type,
    "label-header": LabelType.Header == type,
    "label-subheader": LabelType.SubHeader == type,
    "label-body": LabelType.Body == type,
    "label-link": LabelType.Link == type,
    "label-sublink": LabelType.SubLink == type,
  });

  return (
    <label
      data-testid={dataTestId}
      className={fontStyle}
      style={overrideTextStyles}
      onClick={onLabelClick}
    >
      {text}
    </label>
  );
};


export default Label;
