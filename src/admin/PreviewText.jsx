import React from "react";
import { TextType } from "./Objects";

const PreviewText = (props) => {
  const {
    text,
    type,
    size,
    align,
    italic,
    weight,
    width,
    height,
    floatVal,
    imageUrl,
  } = props.text;

  const typeStyle = () => {
    // Find good implementation for this
  };

  const sizeStyle = () => {
    let sizeWithoutUnderscore = size.substring(1);
    return "text-" + sizeWithoutUnderscore;
  };

  const alignStyle = () => {
    return "text-" + align;
  };

  const italicStyle = () => {
    if (italic) {
      return "italic";
    }
    return "non-italic";
  };

  const weightStyle = () => {
    return "font-" + weight;
  };

  const replaceUnderscoreWithHyphen = (string) => {
    let replacedStr = string.replace("_", "-");
    return replacedStr;
  };

  const widthStyle = () => {
    if (width != "none") {
      return replaceUnderscoreWithHyphen(width);
    }
  };

  const heightStyle = () => {
    if (height != "none") {
      return replaceUnderscoreWithHyphen(height);
    }
  };

  const floatValStyle = () => {
    return replaceUnderscoreWithHyphen(floatVal);
  };

  // Early return the image
  if (type == TextType.IMAGE) {
    return (
      <div>
        <img
          className={`${widthStyle()} ${heightStyle()} ${floatValStyle()}`}
          src={imageUrl}
          alt="Image did not load."
        />
        <div
          className={`${typeStyle()} ${sizeStyle()} ${alignStyle()} ${italicStyle()} ${weightStyle()}`}
        >
          {text}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${typeStyle()} ${sizeStyle()} ${alignStyle()} ${italicStyle()} ${weightStyle()}`}
    >
      {text}
    </div>
  );
};

export default PreviewText;
