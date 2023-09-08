import React from "react";

// Make the links clickable

function Vertigo() {
  var vestibularRehab =
    "https://vestibular.org/healthcare-directory/?circle_op=%3C&circlelocation%5Blocation%5D=holland%20mi&circlelocation%5Bvalue%5D";

  var benignParoxysmalPositionalVertigo =
    "https://vestibular.org/article/diagnosis-treatment/types-of-vestibular-disorders/benign-paroxysmal-positional-vertigo-bppv/";

  var labyrinthitis =
    "https://vestibular.org/article/diagnosis-treatment/types-of-vestibular-disorders/labyrinthitis-and-vestibular-neuritis/";

  var vestibularNeuritis =
    "https://vestibular.org/article/diagnosis-treatment/types-of-vestibular-disorders/labyrinthitis-and-vestibular-neuritis/";

  // Should it be MÉNIÈRE’S DISEASE?
  var menieresSyndrome =
    "https://vestibular.org/article/diagnosis-treatment/types-of-vestibular-disorders/menieres-disease/";

  var perilymphFistula =
    "https://vestibular.org/article/diagnosis-treatment/types-of-vestibular-disorders/perilymph-fistula/";

  return (
    <div>
      <h1>Is Your World Spinning Out of Control?</h1>
      <h2>We’ve got the market cornered on balance.</h2>
      <p>
        There are some kinds of dizzy we encourage…being dizzy with joy, dizzy
        with laughter, dizzy with excitement – you get the idea. But we also
        recognize that dizziness and/or loss of balance in real life is no
        laughing matter. That’s why we’re thrilled to offer our Vestibular Rehab
        program, aimed at treating individuals who suffer from acute or chronic
        vestibular and/or balance dysfunctions. These are symptoms often related
        to issues like:
      </p>

      <ul>
        <li>Benign Paroxysmal Positional Vertigo</li>
        <li>Labarynthitis</li>
        <li>Vestibular Neuritis</li>
        <li>Meniere’s Syndrome</li>
        <li>Perilymph Fistula</li>
        <li>or any other disease process that affects the vestibular system</li>
      </ul>

      <p>
        <bold>Food for thought:</bold>
      </p>
      <ul>
        <li>
          5 – 10% of all physician visits are due to dizziness and balance
          problems.
        </li>
        <li>
          40% of people over 40 years old visit the doctor due to dizziness.
        </li>
        <li>
          Dizziness and balances issues are the #1 reason for physician visits
          in men and women over 45 years of age.
        </li>
      </ul>

      <p>
        Commonly, a patient who can benefit from Vestibular Rehab will complain
        of symptoms like dizziness and disequilibrium, which may secondarily
        cause headaches, de-conditioning and/or muscle tension.
      </p>

      <p>
        <bold>It is our goal to help in the following ways:</bold>
      </p>

      <ul>
        <li>By decreasing feelings of vertigo and/or dizziness,</li>
        <li>By improving balance and posture control,</li>
        <li>By improving gaze stability, and</li>
        <li>
          By improving overall endurance, depending on the your circumstances
        </li>
      </ul>
      <p>
        Let us encourage you to talk to your family physician, Neurologist, or
        Otolaryngologist (ENT) for a referral to physical therapy today. It’s
        our privilege to put stability and balance back into your life where it
        belongs!
      </p>
    </div>
  );
}

export default Vertigo;
