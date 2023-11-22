import React, { useState, useEffect } from "react";
import NssButtonAdd from "../nss/NssButtonAdd";
import TextArea from "./TextArea";
import NssButtonEdit from "../nss/NssButtonEdit";
import NssButtonSubtract from "../nss/NssButtonSubtract";
import NssButtonMoveUpMoveDown from "../nss/NssButtonMoveUpMoveDown";
import NssButtonChevron from "../nss/NssButtonChevron";

function Texts(props) {
  const { employeeId, parentTexts, setChangeDetected, updateTexts, name } =
    props;
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
    setChangeDetected(true);
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
      <div className="flex gap-2 justify-between">
        <div>
          <div className="flex gap-2">
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
          <div>{name}</div>
        </div>
        {showPreview ? (
          <div className="bg-nss-20 border-1 rounded-lg shadow-xl py-2 px-2 mt-2 break-words">
            {texts.map((text, index) => (
              <TextPreview text={text} key={text.id} />
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

const TextPreview = (props) => {
  const { text } = props;

  const QUOTE = "QUOTE";
  const PARAGRAPH = "PARAGRAPH";
  const renderText = () => {
    if (text.type == QUOTE) {
      return <div className="text-md italic text-sm">"{text.text}"</div>;
    }
    if (text.type == PARAGRAPH) {
      return (
        <div className="text-md font-bold indent-7 text-xs">{text.text}</div>
      );
    }
  };

  return <div>{renderText()}</div>;
};

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
  const QUOTE = "QUOTE";
  const PARAGRAPH = "PARAGRAPH";

  const [type, setType] = useState(textObject.type);
  const [text, setText] = useState(textObject.text);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    updateText(returnTextObject(), index);
  }, [type, index, text]);

  const returnTextObject = () => {
    const newText = {
      id: textObject.id,
      type: type,
      text: text,
      position: textObject.position,
      employee: {
        id: employeeId,
      },
    };
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

  const onChangeIsQuote = () => {
    setType(QUOTE);
  };

  const onChangeIsParagraph = () => {
    setType(PARAGRAPH);
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
          <div className="flex gap-2">
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
        <div>
          <div className="flex">
            <ul className="items-center w-56 bg-nss-20 border border-gray-200 rounded-lg sm:flex ">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
                <div className="flex items-center pl-3">
                  <input
                    id="1"
                    type="checkbox"
                    checked={type == QUOTE}
                    onChange={onChangeIsQuote}
                    className="w-4 h-4 accent-nss-300 bg-gray-100 border-gray-300 rounded focus:ring-2 "
                  />
                  <label className="w-full py-3 ml-2 text-xs font-bold">
                    Is Quote
                  </label>
                </div>
              </li>
              <li className="w-full ">
                <div className="flex items-center pl-3">
                  <input
                    id="2"
                    type="checkbox"
                    checked={type == PARAGRAPH}
                    onChange={onChangeIsParagraph}
                    className="w-4 h-4 accent-nss-300 bg-gray-100 border-gray-300 rounded focus:ring-2 "
                  />
                  <label className="w-full py-3 ml-2 text-xs font-bold">
                    Is Paragraph
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-2">
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
          <div className="text-xs">{text}</div>
        )}
      </div>
      {/* JSON.stringify(paragraph) */}
    </div>
  );
};

export default Texts;
