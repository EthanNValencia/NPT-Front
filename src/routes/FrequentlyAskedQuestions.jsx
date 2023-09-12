import React, { useState, useEffect } from "react";
import NtButton from "../components/NtButton";
import FAQsDiv from "../components/FAQsDiv";
import { submitFAQ, getAllAnsweredFAQs } from "../axios/faq-api";
import FAQsLoading from "../components/loading/FAQsLoading";

function FrequentlyAskedQuestions() {
  const [faqs, setFAQs] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);

  function onClick() {
    console.log("The message: " + message);
    var response = submitFAQ(message);
    console.log(response);
  }

  useEffect(() => {
    setLoading(true);
    async function getAnsweredFAQs() {
      await getAllAnsweredFAQs(setLoading, setFAQs);
    }
    getAnsweredFAQs();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <FAQsLoading />
      ) : (
        faqs.map((faq) => <FAQsDiv faq={faq} key={faq.id} />)
      )}

      <div className="mt-6 mb-4">
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Was your question not answered? Please ask your question here.
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-npt_colors-300 focus:border-npt_colors-300 "
          placeholder="Write your question here..."
        ></textarea>
      </div>
      <NtButton label="Submit" onClick={onClick} />
    </div>
  );
}

export default FrequentlyAskedQuestions;

/*
<div className="grid grid-flow-row grid-cols-2 border-b-2">
        <p>When is my payment due? </p>
        <p>When appointment is made.</p>
      </div>
      <div className="grid grid-flow-row grid-cols-2 border-b-2">
        <p>Do I meed to be concerned about my Credit Card security?</p>
        <p>
          Your Card info is stored in our HIPAA compliant software. Once saved,
          we can only see the last 4 digits.
        </p>
      </div>
      <div className="grid grid-flow-row grid-cols-2 border-b-2">
        <p>Will this process thru my insurance?</p> <p>Nope. </p>
      </div>
      <div className="grid grid-flow-row grid-cols-2 border-b-2">
        <p>What is your Cancellation Policy?</p>
        <p>
          Caroline has your time slot reserved JUST FOR YOU. Sorry, no refunds
          for cancellations.
        </p>
      </div>
      <div className="grid grid-flow-row grid-cols-2 border-b-2">
        <p>What virtual meeting platform do you use for appointments?</p>
        <p>
          ZOOM. We’ll email you a link after scheduling. Come to appointment
          ready with all your questions!
        </p>
      </div>

*/
