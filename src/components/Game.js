"use client";

import { useEffect, useState } from "react";

export default function Game({
  name,
  inputValue,
  inputBorderColor,
  setInputBorderColor,
  score,
  timeRemaining,
  setTimeRemaining,
  checkNameSpelling,
}) {
  // Timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      setInputBorderColor("border-gray-300");
    }
  }, [timeRemaining]);

  return (
    <>
      <p className="text-8xl sm:text-9xl">{timeRemaining}</p>
      <p>{name ?? "Loading..."}</p>
      <input
        type="text"
        onChange={checkNameSpelling}
        className={`${inputBorderColor} ${
          timeRemaining === 0 && "bg-gray-300"
        } border-5 rounded-lg outline-none w-[90%] max-w-2xl p-2 sm:p-4`}
        value={inputValue}
        disabled={timeRemaining === 0}
        autoFocus
      ></input>
      <p className="px-4 py-2 rounded-lg bg-blue-600 text-white">
        Score: {score}
      </p>
    </>
  );
}
