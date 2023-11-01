import React, { useState, useEffect } from "react";

function RenderFor(props) {
  const { timeout, control } = props;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
      () => control(true);
    };
  }, []);

  return isVisible ? <div>{props.children}</div> : null;
}

export default RenderFor;

/*
      <RenderFor timeout={2000} control={setAnimatePingFinished}>
        <div>
          <div className="flex justify-center animate-spin">
            <svg
              className="fill-npt_colors-350 w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
            </svg>
          </div>
        </div>
      </RenderFor>

      <RenderFor timeout={500} control={setAnimatePingFinished}>
        <div className="flex justify-center animate-ping">
          <svg
            className="fill-npt_colors-350 w-16 h-16"
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
        </div>
      </RenderFor>

      <div className="flex justify-center">
        <svg
          className="fill-npt_colors-350 w-16 h-16"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>
      </div>
*/
