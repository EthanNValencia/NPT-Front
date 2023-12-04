import React, { useState, useEffect } from "react";
import NssButtonAdd from "../nss/NssButtonAdd";
import TextArea from "./TextArea";
import NssButtonEdit from "../nss/NssButtonEdit";
import NssButtonSubtract from "../nss/NssButtonSubtract";
import NssButtonMoveUpMoveDown from "../nss/NssButtonMoveUpMoveDown";
import NssButtonChevron from "../nss/NssButtonChevron";
import { TextType } from "./Objects";
import Options from "./Options";
import CheckBox from "./CheckBox";
import PreviewText from "./PreviewText";

function Texts(props) {
  const { employeeId, parentTexts, setChangeDetected, updateTexts } = props;
  const [texts, setTexts] = useState(
    [...parentTexts].sort((a, b) => a.position - b.position)
  );
  const [largestId, setLargestId] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const updateAllTextsArrays = (updatedTexts) => {
    setTexts(updatedTexts);
    updateTexts(updatedTexts);
    setChangeDetected(true);
  };

  const addText = () => {
    const newText = {
      id: getId(),
      type: "PARAGRAPH",
      text: "This is sample text.",
      position: texts.length + 1,
      employee: {
        id: employeeId,
      },
    };
    const updatedTexts = [...texts, { ...newText }];
    updateAllTextsArrays(updatedTexts);
  };

  const findLargestId = (id) => {
    if (id > largestId) {
      setLargestId(id);
    }
  };

  const getId = () => {
    setLargestId((prevId) => {
      const nextId = prevId + 1;
      return nextId;
    });
    return largestId + 1;
  };

  const updateText = (text, index) => {
    const updatedTexts = [...texts];
    updatedTexts[index] = text;
    updateAllTextsArrays(updatedTexts);
  };

  const deleteText = (paragraph) => {
    const filteredTexts = texts.filter((p) => p.id !== paragraph.id);
    const updatedTexts = filteredTexts.map((paragraph, index) => ({
      ...paragraph,
      position: index + 1,
    }));
    updateAllTextsArrays(updatedTexts);
  };

  const moveUp = (paragraph, index) => {
    if (index > 0) {
      const updatedTexts = [...texts];
      const temp = updatedTexts[index - 1];

      temp.position = index + 1;
      paragraph.position = index;

      updatedTexts[index - 1] = paragraph;
      updatedTexts[index] = temp;
      updateAllTextsArrays(updatedTexts);
    }
  };

  const moveDown = (paragraph, index) => {
    if (index < texts.length - 1) {
      const updatedTexts = [...texts];
      const temp = updatedTexts[index + 1];

      // Swap positions
      temp.position = index + 1;
      paragraph.position = index + 2;

      updatedTexts[index + 1] = paragraph;
      updatedTexts[index] = temp;
      updateAllTextsArrays(updatedTexts);
    }
  };

  const openPreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="bg-nss-21 border-2 rounded-lg shadow-xl py-2 px-2 mt-2">
      <div className="flex gap-1 justify-between">
        <div>
          <div className="flex gap-1">
            <NssButtonAdd
              onClick={addText}
              label="Add Paragraph"
            ></NssButtonAdd>
            <NssButtonChevron
              onClick={openPreview}
              label="Preview"
              selected={showPreview}
            ></NssButtonChevron>
          </div>
        </div>
        {showPreview ? (
          <div className="bg-nss-20 border-1 rounded-lg shadow-xl py-2 px-2 mt-2 break-words w-3/4">
            {texts.map((text, index) => (
              <PreviewText text={text} key={text.id} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        {texts.map((text, index) => (
          <Text
            textObject={text}
            key={text.id}
            setChangeDetected={setChangeDetected}
            deleteText={deleteText}
            moveUp={moveUp}
            moveDown={moveDown}
            employeeId={employeeId}
            index={index}
            length={texts.length}
            updateText={updateText}
            findLargestId={findLargestId}
          />
        ))}
      </div>
    </div>
  );
}

const Text = (props) => {
  const {
    textObject,
    setChangeDetected,
    deleteText,
    updateText,
    employeeId,
    moveUp,
    moveDown,
    index,
    length,
    findLargestId,
  } = props;
  findLargestId(textObject.id);
  const [type, setType] = useState(textObject.type);
  const [size, setSize] = useState(textObject.size);
  const [align, setAlign] = useState(textObject.align);
  const [text, setText] = useState(textObject.text);
  const [italic, setItalic] = useState(textObject.italic);
  const [weight, setWeight] = useState(textObject.weight);
  const [width, setWidth] = useState(textObject.width);
  const [height, setHeight] = useState(textObject.height);
  const [floatVal, setFloatVal] = useState(textObject.floatVal);
  const [imageUrl, setImageUrl] = useState(textObject.imageUrl);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (type != textObject.type) {
      updateText(returnTextObject(), index);
    } else if (text != textObject.text) {
      updateText(returnTextObject(), index);
    } else if (size != textObject.size) {
      updateText(returnTextObject(), index);
    } else if (align != textObject.align) {
      updateText(returnTextObject(), index);
    } else if (weight != textObject.weight) {
      updateText(returnTextObject(), index);
    } else if (italic != textObject.italic) {
      updateText(returnTextObject(), index);
    } else if (width != textObject.width) {
      updateText(returnTextObject(), index);
    } else if (height != textObject.height) {
      updateText(returnTextObject(), index);
    } else if (floatVal != textObject.floatVal) {
      updateText(returnTextObject(), index);
    } else if (imageUrl != textObject.imageUrl) {
      updateText(returnTextObject(), index);
    }
  }, [
    type,
    size,
    align,
    weight,
    italic,
    text,
    width,
    height,
    floatVal,
    imageUrl,
  ]);

  const returnTextObject = () => {
    const newText = {
      id: textObject.id,
      type: type,
      typeArr: textObject.typeArr,
      size: size,
      sizeArr: textObject.sizeArr,
      align: align,
      alignArr: textObject.alignArr,
      weight: weight,
      weightArr: textObject.weightArr,
      italic: italic,
      text: text,
      width: width,
      widthArr: textObject.widthArr,
      height: height,
      heightArr: textObject.heightArr,
      floatVal: floatVal,
      floatArr: textObject.floatArr,
      imageUrl: imageUrl,
      position: textObject.position,
      employee: {
        id: employeeId,
      },
    };
    console.log(newText);
    return newText;
  };

  const textFieldChangeDetected = () => {
    setChangeDetected(true);
  };

  const onEditParagraph = () => {
    setEditMode(!editMode);
  };

  const ondeleteText = () => {
    deleteText(textObject);
  };

  const onChangeType = (newType) => {
    setType(newType);
  };

  const onChangeSize = (newSize) => {
    setSize(newSize);
  };

  const onChangeAlign = (newAlign) => {
    setAlign(newAlign);
  };

  const onChangeWeight = (newWeight) => {
    setWeight(newWeight);
  };

  const onChangeItalic = (value) => {
    setItalic(value);
  };

  const onChangeWidth = (newWidth) => {
    setWidth(newWidth);
  };

  const onChangeHeight = (newHeight) => {
    setHeight(newHeight);
  };

  const onChangeFloatVal = (newFloatVal) => {
    setFloatVal(newFloatVal);
  };

  const onMoveUp = () => {
    moveUp(returnTextObject(), index);
  };

  const onMoveDown = () => {
    moveDown(returnTextObject(), index);
  };

  return (
    <div className="bg-nss-21 border rounded-lg shadow-xl py-2 px-2 mt-2">
      <div className="flex justify-between">
        <div>
          <div className="flex gap-1">
            <NssButtonEdit
              onClick={onEditParagraph}
              label="Edit"
              selected={editMode}
            ></NssButtonEdit>
            <NssButtonSubtract
              onClick={ondeleteText}
              label="Delete"
              disabled={textObject.id == null}
            ></NssButtonSubtract>
          </div>
        </div>
        <div className="bg-nss-20 border rounded-lg shadow-xl py-2 px-2">
          <div className="text-xs text-center">Settings</div>
          {type == TextType.IMAGE ? (
            <div className="flex gap-1 pb-1">
              <Options
                selected={width}
                selectOptions={textObject.widthArr}
                name={"Image Width"}
                selectedChange={onChangeWidth}
              />
              <Options
                selected={height}
                selectOptions={textObject.heightArr}
                name={"Image Height"}
                selectedChange={onChangeHeight}
              />
              <Options
                selected={floatVal}
                selectOptions={textObject.floatArr}
                name={"Image Float"}
                selectedChange={onChangeFloatVal}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="flex gap-1">
            <Options
              selected={type}
              selectOptions={textObject.typeArr}
              name={"Type"}
              selectedChange={onChangeType}
            />
            <Options
              selected={size}
              selectOptions={textObject.sizeArr}
              name={"Size"}
              selectedChange={onChangeSize}
            />
            <Options
              selected={align}
              selectOptions={textObject.alignArr}
              name={"Align"}
              selectedChange={onChangeAlign}
            />
            <Options
              selected={weight}
              selectOptions={textObject.weightArr}
              name={"Weight"}
              selectedChange={onChangeWeight}
            />
            <CheckBox
              selected={italic}
              name={"Italic"}
              selectedChange={onChangeItalic}
            />
          </div>
        </div>
        <div>
          <div className="flex"></div>
        </div>
        <div className="flex gap-1">
          <div>
            <div className="text-xs font-bold">Position:</div>
            <div className="text-xs text-center">{textObject.position}</div>
          </div>
          <div>
            <NssButtonMoveUpMoveDown
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              disabledMoveDown={index + 1 == length ? true : false}
              disabledMoveUp={index == 0 ? true : false}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text-xs font-bold">Text:</div>
        {editMode ? (
          <div className="pt-1">
            <TextArea
              text={text}
              onTextChange={setText}
              changeDetected={textFieldChangeDetected}
              rows={2}
            />
          </div>
        ) : (
          <div className="text-xs break-words">{text}</div>
        )}
        <div className="text-xs font-bold">Image URL:</div>
        {type == TextType.IMAGE ? (
          <div>
            {editMode ? (
              <div className="pt-1">
                <TextArea
                  text={imageUrl}
                  onTextChange={setImageUrl}
                  changeDetected={textFieldChangeDetected}
                  rows={1}
                />
              </div>
            ) : (
              <div className="text-xs break-words">{imageUrl}</div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Texts;
