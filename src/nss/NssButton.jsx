import React from 'react'

function NssButton(props) {
  const { onClick, label } = props;

  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded text-nss-20 bg-nss-300 hover:bg-nss-305 hover:text-nss-10 transition ease-in-out duration-500 cursor-pointer"
      onClick={onClick}
    >{label}</button>
  )
}

export default NssButton