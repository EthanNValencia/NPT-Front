import React, {useState} from 'react'

function MultipleCheckBoxes(props) {
   const { emailIsSelected, setEmailIsSelected, phoneIsSelected, setPhoneIsSelected  } = props;


  const onChangeEmail = (e) => {
    const newValue = e.target.checked;
    setEmailIsSelected(newValue);
}

const onChangePhoneNumber = (e) => {
    const newValue = e.target.checked;
    setPhoneIsSelected(newValue);
}

  return (
    <div className="flex flex-col justify-center items-center mb-4">
    <ul className="items-center w-56 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
                <input id="1" type="checkbox" value={emailIsSelected} onChange={onChangeEmail} className="w-4 h-4 accent-npt_colors-350 bg-gray-100 border-gray-300 rounded focus:ring-2 " />
                <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email </label>
            </div>
        </li>
        <li className="w-full dark:border-gray-600">
            <div className="flex items-center pl-3">
                <input id="2" type="checkbox" value={phoneIsSelected} onChange={onChangePhoneNumber} className="w-4 h-4 accent-npt_colors-350 bg-gray-100 border-gray-300 rounded focus:ring-2 " />
                <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone </label>
            </div>
        </li>
    </ul>
    </div>
  )
}

export default MultipleCheckBoxes;