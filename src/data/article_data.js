const contentTypes = {
  textPoints: "TEXT-POINTS",
  test: "TEXT",
  points: "POINTS",
  image: "IMAGE",
};

const article_data = [
  (data = {
    // http://nephewpt.com/helpme/vertigo/
    title: "Is Your World Spinning Out of Control?",
    subtitle: "We’ve got the market cornered on balance.",
    content: [
      {
        text: "There are some kinds of dizzy we encourage… being dizzy with joy, dizzy with laughter, dizzy with excitement – you get the idea. But we also recognize that dizziness and/or loss of balance in real life is no laughing matter. That’s why we’re thrilled to offer our Vestibular Rehab program, aimed at treating individuals who suffer from acute or chronic vestibular and/or balance dysfunctions. These are symptoms often related to issues like:",
        points: [
          "Benign Paroxysmal Positional Vertigo",
          "Labarynthitis",
          "Vestibular Neuritis",
          "Meniere’s Syndrome",
          "Perilymph Fistula",
          "or any other disease process that affects the vestibular system",
        ],
        type: contentTypes.textPoints,
      },
      {
        text: "Food for thought:",
        points: [
          "5 – 10% of all physician visits are due to dizziness and balance problems.",
          "40% of people over 40 years old visit the doctor due to dizziness.",
          "Dizziness and balances issues are the #1 reason for physician visits in men and women over 45 years of age.",
        ],
        type: contentTypes.textPoints,
      },
      {
        text: "Commonly, a patient who can benefit from Vestibular Rehab will complain of symptoms like dizziness and disequilibrium, which may secondarily cause headaches, de-conditioning and/or muscle tension.",
        type: "TEXT",
      },
      {
        text: "It is our goal to help in the following ways (depending on the your circumstances):",
        points: [
          "By decreasing feelings of vertigo and/or dizziness",
          "By improving balance and posture control",
          "By improving gaze stability",
          "By improving overall endurance",
        ],
        type: contentTypes.textPoints,
      },
    ],
    conclusion:
      "Let us encourage you to talk to your family physician, Neurologist, or Otolaryngologist (ENT) for a referral to physical therapy today. It’s our privilege to put stability and balance back into your life where it belongs!",
  }),
  (data = {
    title: "",
    subtitle: "",
    content: [
      {
        text: "",
        points: ["", "", ""],
        type: contentTypes.textPoints,
      },
    ],
    conclusion: "",
  }),
];

export default article_data;
