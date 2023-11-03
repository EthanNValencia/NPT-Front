import React, { useState, useRef, useContext } from "react";
import NssButton from "../nss/NssButton";
import { updateFaqApi, deleteFaqApi } from "../axios/api";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";

function FaqAdminDiv(props) {
  const { faq } = props;
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [questionAnswered, setQuestionAnswered] = useState(
    faq.questionIsAnswered
  );
  const [editMode, setEditMode] = useState(false);
  const [changeDetected, setChangeDetected] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const authContext = useContext(AuthContext);

  const editFaq = () => {
    setEditMode(!editMode);
  };
  const saveFaq = async () => {
    try {
      setLoading(true);
      // id":21,"questionIsAnswered":true,"question":"When is my payment due? ","answer":"When appointment is made."}
      const updatedFaq = await updateFaqApi(
        {
          id: faq.id,
          questionIsAnswered: questionAnswered,
          question: question,
          answer: answer,
        },
        authContext.token
      );
      // Id should remain the same.
      setAnswer(updatedFaq.answer);
      setQuestion(updatedFaq.question);
      setQuestionAnswered(updatedFaq.questionIsAnswered);
      setHasApiError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
    }
  };

  const deleteFaq = async () => {
    try {
      setLoading(true);
      await deleteFaqApi(faq, authContext.token);
      setLoading(false);
      setIsDeleted(true);
      setHasApiError(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
    }
  };

  const markAnswered = () => {
    setQuestionAnswered(true);
  };

  const testLoading = () => {
    setLoading(!loading);
  };

  const pickDivColor = () => {
    if (loading) {
      return "border-r-8 border-red-400 animate-pulse";
    }
    if (editMode) {
      return "border-r-8 border-yellow-600";
    }
    if (!questionAnswered) {
      return "border-r-8 border-red-600";
    }
    if (answer != null) {
      return "border-r-8 border-green-600";
    }
  };

  return (
    <div>
      {isDeleted ? (
        <></>
      ) : (
        <div
          className={`border rounded-lg shadow-xl py-2 px-2 my-2 ${pickDivColor()}`}
        >
          <div key={faq.id} className="grid grid-flow-col grid-cols-2 gap-x-2">
            <div>
              <div>Question:</div>
              {editMode ? (
                <TextArea
                  text={question}
                  change={setQuestion}
                  changeDetected={setChangeDetected}
                />
              ) : (
                <div>{question}</div>
              )}
            </div>
            <div>
              <div>Answer:</div>
              {!questionAnswered || editMode ? (
                <TextArea
                  text={answer}
                  change={setAnswer}
                  changeDetected={setChangeDetected}
                />
              ) : (
                <div>{answer}</div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 pt-2">
              <NssButton onClick={editFaq} disabled={loading} label="Edit" />
              <NssButton onClick={saveFaq} disabled={loading} label="Save" />
              <NssButton
                onClick={deleteFaq}
                disabled={loading}
                label="Delete"
              />
              <NssButton
                onClick={testLoading}
                disabled={false}
                label="Test Loading"
              />
              {!questionAnswered ? (
                <NssButton
                  onClick={markAnswered}
                  disabled={loading}
                  label="Mark Answered"
                />
              ) : (
                <></>
              )}
            </div>
            {changeDetected ? (
              <div className="text-yellow-400 font-bold pt-2 animate-pulse">
                A change was detected. Do not forget to save.
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>{hasApiError ? <ApiError /> : <></>}</div>
        </div>
      )}
    </div>
  );
}

const TextArea = (props) => {
  const { text, change, changeDetected } = props;
  return (
    <textarea
      value={text}
      onChange={(e) => {
        change(e.target.value);
        changeDetected(true);
      }}
      id="message"
      rows="2"
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-npt_colors-30 focus:border-npt_colors-30 "
      placeholder="Write your answer here..."
    ></textarea>
  );
};

export default FaqAdminDiv;
