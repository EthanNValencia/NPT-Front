import React, { useState, useContext, useEffect } from "react";
import NssButton from "../nss/NssButton";
import { updateFaqApi, deleteFaqApi } from "../axios/api";
import { AuthContext } from "../contexts/context";
import ApiError from "../components/ApiError";
import TextArea from "./TextArea";
import NssButtonSubtract from "../nss/NssButtonSubtract";
import NssButtonSave from "../nss/NssButtonSave";
import NssButtonEdit from "../nss/NssButtonEdit";
import NssButtonAdd from "../nss/NssButtonAdd";
import NssButtonReload from "../nss/NssButtonReload";
import { adminGetUnansweredQuestions } from "../axios/api";
import DataField from "./DataField";

function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const authContext = useContext(AuthContext);
  const [hasApiError, setHasApiError] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    try {
      const data = await adminGetUnansweredQuestions(authContext.token);
      setFaqs(data);
      setHasApiError(false);
    } catch (error) {
      setHasApiError(true);
    }
  }

  const updateFaqObjects = (faq, index) => {
    const updatedFaqObjects = [...faqs];
    if (index >= 0 && index < updatedFaqObjects.length) {
      updatedFaqObjects[index] = faq;
      setFaqs(updatedFaqObjects);
    }
  };

  const createFaq = () => {
    const newFaq = {
      id: null,
      questionIsAnswered: false,
      question: null,
      answer: null,
    };
    setFaqs([...faqs, newFaq]);
  };

  const loadFaqs = () => {
    fetchFaqs();
  };

  const removeFaq = (faqToRemove) => {
    const newFaqList = faqs.filter((faq) => faq.id !== faqToRemove.id);
    setFaqs(newFaqList);
  };

  return (
    <div>
      <div className="flex gap-2 py-2">
        <NssButtonAdd onClick={createFaq} label="Create FAQ"></NssButtonAdd>
        <NssButtonReload
          onClick={loadFaqs}
          label="Reload FAQs"
        ></NssButtonReload>
      </div>
      <div className="">
        <div className="grid xl:grid-cols-2 gap-2 lg:grid-cols-1">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="">
              <FAQ
                faq={faq}
                removeFaq={removeFaq}
                updateFaqObjects={updateFaqObjects}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
      <div>{hasApiError ? <ApiError /> : <></>}</div>
    </div>
  );
}

function FAQ(props) {
  const { faq, removeFaq, index, updateFaqObjects } = props;
  const [id, setId] = useState(faq.id);
  const [question, setQuestion] = useState(faq.question);
  const [answer, setAnswer] = useState(faq.answer);
  const [questionAnswered, setQuestionAnswered] = useState(
    faq.questionIsAnswered
  );
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(id == null);
  const [changeDetected, setChangeDetected] = useState(false);
  const [hasApiError, setHasApiError] = useState(false);
  // const [isDeleted, setIsDeleted] = useState(false);
  const authContext = useContext(AuthContext);

  const removeThisFaq = () => {
    const thisFaq = {
      id: faq.id,
      questionIsAnswered: questionAnswered,
      question: question,
      answer: answer,
    };
    removeFaq(thisFaq);
  };

  const editFaq = () => {
    setEditMode(!editMode);
  };

  const saveFaq = async () => {
    if (questionAnswered || !editMode) {
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
        setId(updatedFaq.id);
        setAnswer(updatedFaq.answer);
        setQuestion(updatedFaq.question);
        setQuestionAnswered(updatedFaq.questionIsAnswered);
        updateFaqObjects(updatedFaq, index);
        setHasApiError(false);
        setLoading(false);
        setChangeDetected(false);
      } catch (error) {
        setLoading(false);
        setHasApiError(true);
      }
    }
  };

  const deleteFaq = async () => {
    if (id == null) {
      // faq was not yet persisted
      removeThisFaq();
      return;
    }
    try {
      setLoading(true);
      await deleteFaqApi(id, authContext.token);
      removeThisFaq();
      setLoading(false);
      // setIsDeleted(true);
      setHasApiError(false);
    } catch (error) {
      setLoading(false);
      setHasApiError(true);
    }
  };

  const markAnswered = () => {
    if (answer != null && answer != "") {
      setQuestionAnswered(true);
    }
  };

  const textFieldChangeDetected = (value) => {
    if (value == null || value == "") {
      setChangeDetected(false);
      return;
    }
    setChangeDetected(true);
  };

  const ReturnDisplayMessage = () => {
    if (loading) {
      return <div>Your changes are being submitted...</div>;
    }
    if (editMode) {
      return (
        <div className="text-yellow-400 font-bold pt-2 animate-pulse">
          Edit mode is on.
        </div>
      );
    }
    if (changeDetected && questionAnswered) {
      return (
        <div className="text-yellow-400 font-bold pt-2">
          A change was detected. Do not forget to save.
        </div>
      );
    }
    if (!questionAnswered) {
      return (
        <div className="text-red-700 font-bold pt-2">
          This question needs to be answered.
        </div>
      );
    }
    if (answer != null && answer != "" && question != null && question != "") {
      return (
        <div className="text-green-700 font-bold pt-2">
          No changes detected.
        </div>
      );
    }
  };

  const pickDivColor = () => {
    if (loading) {
      return "border-r-8 border-red-400 animate-pulse";
    }
    if (editMode) {
      return "border-r-8 border-yellow-600";
    }
    if (changeDetected && questionAnswered) {
      return "border-r-8 border-yellow-600 animate-pulse";
    }
    if (!questionAnswered) {
      return "border-r-8 border-red-600";
    }
    if (answer != null && answer != "") {
      return "border-r-8 border-green-600";
    }
  };

  const disableButton = () => {
    if (loading) {
      return true;
    }
    if (editMode) {
      return true;
    }
    if (changeDetected && questionAnswered) {
      return false;
    }
    if (questionAnswered) {
      return false;
    }
    if (answer != null || answer != "" || question != null || question != "") {
      return false;
    }
  };

  return (
    <div className="h-full">
      <div
        className={`h-full bg-nss-21 border rounded-lg shadow-xl p-1 ${pickDivColor()}`}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <div key={id} className="grid grid-flow-col grid-cols-2 gap-x-1">
              <div className="bg-nss-20 border p-2  rounded-md">
                <div className="text-xs font-bold">Question:</div>
                {editMode ? (
                  <TextArea
                    text={question}
                    onTextChange={setQuestion}
                    changeDetected={textFieldChangeDetected}
                  />
                ) : (
                  <DataField value={question} />
                )}
              </div>
              <div className="bg-nss-20 border p-2  rounded-md">
                <div className="text-xs font-bold">Answer:</div>
                {!questionAnswered || editMode ? (
                  <TextArea
                    text={answer}
                    onTextChange={setAnswer}
                    changeDetected={textFieldChangeDetected}
                  />
                ) : (
                  <DataField value={answer} />
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <div className="flex gap-2 pt-2">
                <NssButtonEdit
                  onClick={editFaq}
                  disabled={loading}
                  label="Edit"
                />
                <NssButtonSave
                  onClick={saveFaq}
                  disabled={disableButton()}
                  label="Save"
                />
                <NssButtonSubtract
                  onClick={deleteFaq}
                  disabled={loading || id == null}
                  label="Delete"
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
              <ReturnDisplayMessage />
            </div>
          </div>
          <div>{hasApiError ? <ApiError /> : <></>}</div>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
