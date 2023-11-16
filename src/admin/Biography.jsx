import React, { useState } from "react";
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
      isParagraph: true,
      isQuote: false,
      text: "This is sample text.",
      position: biography.length + 1,
      employee: {
        id: employeeId,
      },
    };
    //console.log(JSON.stringify(newParagraph));
    const updatedBiographicalTexts = [...biography, { ...newParagraph }];
    setBiography(updatedBiographicalTexts);
    updateParentBiographicalTexts(updatedBiographicalTexts);
    setChangeDetected(true);
    //console.log(JSON.stringify(updateParentBiographicalTexts)); // this is undefined?
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
      <div>
        {biography.map((paragraph, index) => (
          <Paragraph
            paragraph={paragraph}
            key={index}
            setChangeDetected={setChangeDetected}
          />
        ))}
      </div>
    </div>
  );
}

const Paragraph = (props) => {
  const { paragraph, setChangeDetected } = props;
  const [isParagraph, setIsParagraph] = useState(paragraph.isParagraph);
  const [isQuote, setIsQuote] = useState(paragraph.isQuote);
  const [text, setText] = useState(paragraph.text);
  const [position, setPosition] = useState(paragraph.position);
  const [editMode, setEditMode] = useState(false);

  const textFieldChangeDetected = (value) => {
    setChangeDetected(true);
  };

  const editParagraph = () => {
    setEditMode(!editMode);
  };

  const deleteParagraph = () => {};

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

  const onMoveUp = () => {};

  const onMoveDown = () => {};

  return (
    <div className="bg-nss-21 border rounded-lg shadow-xl py-2 px-2 mt-2">
      <div className="flex justify-between">
        <div>
          <div className="flex gap-2">
            <NssButtonEdit
              onClick={editParagraph}
              label="Edit"
              selected={editMode}
            ></NssButtonEdit>
            <NssButtonSubtract
              onClick={deleteParagraph}
              label="Delete"
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
              disabled={false}
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
    </div>
  );
};

export default Biography;
