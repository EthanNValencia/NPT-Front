import React, { useState } from "react";
import NssButton from "../nss/NssButton";

function FaqAdminDiv(props) {
  const { faq } = props;
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [editMode, setEditMode] = useState(false);

  const editFaq = () => {
    setEditMode(!editMode);
  };
  const saveFaq = () => {
    // api call to save
  };
  const deleteFaq = () => {
    // api call to delete
  };

  const pickDivColor = () => {
    if (editMode) {
      return "border-r-8 border-yellow-600";
    }
    if (answer == null) {
      return "border-r-8 border-red-600";
    }
    if (answer != null) {
      return "border-r-8 border-green-600";
    }
  };

  return (
    <div>
      <div
        className={`border rounded-lg shadow-xl py-2 px-2 my-2 ${pickDivColor()}`}
      >
        <div key={faq.id} className="grid grid-flow-col grid-cols-2 gap-x-2">
          <div>
            <div>Question:</div>
            {editMode ? (
              <AnswerTextArea text={question} change={setQuestion} />
            ) : (
              <div>{question}</div>
            )}
          </div>
          <div>
            <div>Answer:</div>
            {answer == null || editMode ? (
              <AnswerTextArea text={answer} change={setAnswer} />
            ) : (
              <div>{answer}</div>
            )}
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <NssButton onClick={editFaq} label="Edit" />
          <NssButton onClick={saveFaq} label="Save" />
          <NssButton onClick={deleteFaq} label="Delete" />
        </div>
      </div>
    </div>
  );
}

const AnswerTextArea = (props) => {
  const { text, change } = props;
  return (
    <textarea
      value={text}
      onChange={(e) => change(e.target.value)}
      id="message"
      rows="2"
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-npt_colors-30 focus:border-npt_colors-30 "
      placeholder="Write your answer here..."
    ></textarea>
  );
};

export default FaqAdminDiv;
