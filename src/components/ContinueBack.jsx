import React from 'react'

function ContinueBack(props) {
  return (
    <div><div className="flex justify-between">
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-300 transition ease-in-out duration-150 cursor-pointer"
      disabled=""
      onClick={props.goBack}
    >
      Go Back
    </button>
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-npt_colors-350 hover:bg-npt_colors-300 transition ease-in-out duration-150 cursor-pointer"
      disabled=""
      onClick={props.onContinue}
    >
      Continue
    </button>
  </div></div>
  )
}

export default ContinueBack