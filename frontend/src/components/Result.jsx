import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearState } from '../redux/rootSlice';
import toast from 'react-hot-toast';

const Result = () => {
  const [correctAns, setCorrectAns] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const { words, result } = useSelector((state) => state.root);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Filter questions outside of useEffect
  const questions = words.filter((item) => item.word);

  useEffect(() => {
    const countMatchingElements = (arr1, arr2) => {
      return arr1.filter((item, index) => item === arr2[index]).length;
    };

    const correctAnswers = countMatchingElements(
      result,
      words.map((word) => word.meaning)
    );

    setCorrectAns(correctAnswers);
    const newPercentage = (correctAnswers / words.length) * 100;
    setPercentage(newPercentage);

    // Delay the toast messages to ensure the state is updated
    setTimeout(() => {
      if (newPercentage < 50) {
        toast.error('OOPS, You are fail');
      } else {
        toast.success('You have passed');
      }
    }, 100);
  }, [result, words]);

  const resetHandler = () => {
    navigate('/');
    dispatch(clearState());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-6">Result</h1>
        <p className="text-xl text-center mb-4">Percentage: {percentage.toFixed(2)}%</p>
        <p className="text-xl text-center mb-4">
          {percentage >= 50 ? 'Pass' : 'Fail'}
        </p>
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Questions</h2>
            <ul className="space-y-2">
              {questions.map((question, index) => (
                <li key={index} className="bg-gray-700 p-2 rounded">
                  {index + 1} - What is the meaning of {question.word}?
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Answers</h2>
            <ul className="space-y-2">
              {result.map((answer, index) => (
                <li key={index} className={`bg-gray-700 p-2 rounded ${answer === words[index].meaning ? 'text-green-500' : 'text-red-500'}`}>
                  {index + 1} - {answer}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Correct Answers</h2>
            <ul className="space-y-2">
              {words.map((word, index) => (
                <li key={index} className="bg-gray-700 p-2 rounded">
                  {index + 1} - {word.meaning}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={resetHandler}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Result;