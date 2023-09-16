"use client";
import React, { useState } from "react";
import { resultInitialState } from "../components/constants";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const { question, choices, correctAnswer } = questions[currentQuestion];
  const [showResult, setShowResult] = useState(false);
  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };
  const onClickNext = () => {
    setAnswerIdx(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };
  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };

  return (
    <div className=" w-[500px] bg-white rounded-[4px] my-[30px]  py-[30px] px-[60px] box-border">
      {!showResult ? (
        <>
          <span className="text-[32px] font-medium text-blue-800">
            {currentQuestion + 1}
          </span>
          <span className="text-[16px] font-medium text-zinc-400">
            /{questions.length}
          </span>
          <h2 className="text-[20px] font-medium m-0 ">{question}</h2>
          <ul className="mt-[20px] ml-[-40px]">
            {choices.map((choice, index) => (
              <li
                key={choice}
                onClick={() => onAnswerClick(choice, index)}
                className={`no-underline list-none text-[16px]  bg-white border-2 border-solid border-zinc-300 rounded-[16px] p-[11px] mt-[15px] cursor-pointer ${
                  answerIdx === index ? " bg-blue-800 text-white " : ""
                }`}
              >
                {choice}
              </li>
            ))}
          </ul>
          <div className="flex justify-end ">
            <button
              onClick={() => onClickNext()}
              disabled={answerIdx === null}
              className="bg-blue-600 rounded-[9px] text-[18px] text-white py-[10px] px-[42px] outline-none border-none mt-[15px] cursor-pointer disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed"
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center flex flex-col justify-around items-center h-full ">
          <h3 className="text-[24px] space-x-2 tracking-[1.4px]">Result</h3>
          <p className="text-[16px] font-medium ">
            Total Questions:{" "}
            <span className="text-blue-900 text-[22px] ">
              {questions.length}
            </span>
          </p>
          <p className="text-[16px] font-medium ">
            Total Score:{" "}
            <span className="text-blue-900 text-[22px] ">{result.score}</span>
          </p>
          <p className="text-[16px] font-medium ">
            Correct Answers:{" "}
            <span className="text-blue-900 text-[22px] ">
              {result.correctAnswers}
            </span>
          </p>
          <p className="text-[16px] font-medium ">
            Wrong Answers:{" "}
            <span className="text-blue-900 text-[22px] ">
              {result.wrongAnswers}
            </span>
          </p>
          <button className="bg-blue-700 py-2 px-4 text-white rounded-lg" onClick={onTryAgain}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
