import React from "react";

function FrequentlyAskedQuestions() {
  return (
    <div className="p-4">
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
    </div>
  );
}

export default FrequentlyAskedQuestions;
