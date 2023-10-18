import React from 'react'

function ContinueBack(props) {
  const { continueIsEnabled, goBack, onContinue } = props;

  return (
    <div><div className="flex justify-between">
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black transition ease-in-out duration-150 cursor-pointer"
      disabled=""
      onClick={goBack}
    >
      Go Back
    </button>
    {continueIsEnabled ?
    (<button
      type="button"
      className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-10 hover:text-black transition ease-in-out duration-150 cursor-pointer"
      disabled=""
      onClick={onContinue}
    >
      Continue
    </button>) : 
    (<button
      type="button"
      className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-black bg-npt_colors-1"
      disabled
    >
      Continue
    </button>)}

  </div></div>
  )
}

export default ContinueBack