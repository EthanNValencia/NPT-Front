import React, { useState, useEffect } from "react";
import NssButtonAdd from "../nss/NssButtonAdd";
import TextArea from "./TextArea";
import NssButtonEdit from "../nss/NssButtonEdit";
import NssButtonSubtract from "../nss/NssButtonSubtract";
import NssButtonMoveUpMoveDown from "../nss/NssButtonMoveUpMoveDown";

function Biography(props) {
  const {
    employeeId,
    biographicalTexts,
    setChangeDetected,
    updateParentBiographicalTexts,
  } = props;
  const [biography, setBiography] = useState([...biographicalTexts]);

  const addParagraph = () => {
    const newParagraph = {
      paragraph: true,
      quote: false,
      text: "This is sample text.",
      position: biography.length + 1,
      employee: {
        id: employeeId,
      },
    };
    const updatedBiographicalTexts = [...biography, { ...newParagraph }];
    setBiography(updatedBiographicalTexts);
    updateParentBiographicalTexts(updatedBiographicalTexts);
    setChangeDetected(true);
  };

  const updateText = (text, index) => {
    const updatedBiographicalTexts = [...biography];
    updatedBiographicalTexts[index] = text;
    setBiography(updatedBiographicalTexts);
    updateParentBiographicalTexts(updatedBiographicalTexts);
    setChangeDetected(true);
  };

  const deleteText = (paragraph) => {
    const updatedBiographicalTexts = biography.filter(
      (p) => p.id !== paragraph.id
    );
    setBiography(updatedBiographicalTexts);
    updateParentBiographicalTexts(updatedBiographicalTexts);
    setChangeDetected(true);
  };

  const moveUp = (paragraph, index) => {
    if (index > 0) {
      const updatedBiographicalTexts = [...biography];
      const temp = updatedBiographicalTexts[index - 1];

      // Swap positions
      temp.position = index + 1;
      paragraph.position = index;

      updatedBiographicalTexts[index - 1] = paragraph;
      updatedBiographicalTexts[index] = temp;

      setBiography(updatedBiographicalTexts);
      updateParentBiographicalTexts(updatedBiographicalTexts);
      setChangeDetected(true);
    }
  };

  const moveDown = (paragraph, index) => {
    if (index < biography.length - 1) {
      const updatedBiographicalTexts = [...biography];
      const temp = updatedBiographicalTexts[index + 1];

      // Swap positions
      temp.position = index + 1;
      paragraph.position = index + 2;

      updatedBiographicalTexts[index + 1] = paragraph;
      updatedBiographicalTexts[index] = temp;

      setBiography(updatedBiographicalTexts);
      updateParentBiographicalTexts(updatedBiographicalTexts);
      setChangeDetected(true);
    }
  };

  return (
    <div className="bg-nss-21 border-2 rounded-lg shadow-xl py-2 px-2 mt-2">
      <div className="flex">
        <NssButtonAdd
          onClick={addParagraph}
          label="Add Paragraph"
        ></NssButtonAdd>
      </div>
      <div>Biography: This needs work</div>
      {JSON.stringify(biographicalTexts)}
      <div>
        {biography.map((paragraph, index) => (
          <Text
            paragraph={paragraph}
            key={index}
            setChangeDetected={setChangeDetected}
            deleteText={deleteText}
            moveUp={moveUp}
            moveDown={moveDown}
            employeeId={employeeId}
            index={index}
            length={biography.length}
            updateText={updateText}
          />
        ))}
      </div>
    </div>
  );
}

const Text = (props) => {
  const {
    paragraph,
    setChangeDetected,
    deleteText,
    updateText,
    employeeId,
    moveUp,
    moveDown,
    index,
    length,
  } = props;
  const [isParagraph, setIsParagraph] = useState(paragraph.paragraph);
  const [isQuote, setIsQuote] = useState(paragraph.quote);
  const [text, setText] = useState(paragraph.text);
  const [position, setPosition] = useState(paragraph.position);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    updateText(returnTextObject());
  }, [isParagraph, isQuote, text]);

  const returnTextObject = () => {
    const newText = {
      paragraph: isParagraph,
      quote: isQuote,
      text: text,
      position: position,
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
    deleteText(paragraph);
  };

  const onChangeIsQuote = (e) => {
    const newValue = e.target.checked;
    setIsQuote(newValue);
    if (newValue) {
      setIsParagraph(false);
    }
  };

  const onChangeIsParagraph = (e) => {
    const newValue = e.target.checked;
    setIsParagraph(newValue);
    if (newValue) {
      setIsQuote(false);
    }
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
              disabled={paragraph.id == null}
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
                    checked={isQuote}
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
                    checked={isParagraph}
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
            <div className="text-xs text-center">{position}</div>
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

export default Biography;
