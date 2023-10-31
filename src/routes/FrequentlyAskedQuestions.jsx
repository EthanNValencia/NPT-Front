import React, { useState, useEffect } from "react";
import NtButton from "../components/NtButton";
import FAQsDiv from "../components/FAQsDiv";
import { postFaq, getAnsweredFAQs } from "../axios/api";
import FAQsLoading from "../components/loading/FAQsLoading";

function FrequentlyAskedQuestions() {
  const [faqs, setFAQs] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    try {
      const response = await postFaq(message);
      // console.log('FAQ submitted:', response);
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    }
  }

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const data = await getAnsweredFAQs();
        // console.log(data);
        setFAQs(data);
      } catch (error) {
        console.error("Error loading FAQ:", error);
      }
    }
    fetchFaqs();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-flow-row grid-cols-2 border-b-4 text-2xl tracking-tighter">
        <h1>Questions</h1>
        <h1>Answers</h1>
      </div>

      {faqs.map((faq) => (
        <FAQsDiv faq={faq} key={faq.key} />
      ))}

      {/*
      {loading ? (
        <FAQsLoading />
      ) : (
        faqs.map((faq) => <FAQsDiv faq={faq} key={faq.id} />)
      )}
      */}

      <div className="mt-6 mb-4">
        <label className="block mb-2 text-xl font-medium text-gray-900">
          Was your question not answered? Please ask your question here.
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-npt_colors-30 focus:border-npt_colors-30 "
          placeholder="Write your question here..."
        ></textarea>
      </div>
      <div className="flex">
        <NtButton label="Submit Question" onClick={onClick} loading={loading} />
      </div>
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
