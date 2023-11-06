import React from "react";

function FAQsDiv(props) {
  return (
    <div className="grid grid-flow-row grid-cols-2 border-b-2">
      <p>{props.faq.question}</p>
      <p>{props.faq.answer}</p>
    </div>
  );
}

export default FAQsDiv;
