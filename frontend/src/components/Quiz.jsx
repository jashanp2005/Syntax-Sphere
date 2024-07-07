import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getWordsSuccess, saveResult, getWordsFail, getWordsRequest, clearState } from "../redux/rootSlice";
import { translateWords } from '../utils/features';

function RadioGroup() {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [count, setCount] = useState(0);
  const [ans, setAns] = useState('');
  const [loading, setLoading] = useState(true); // To handle loading state for words

  const dispatch = useDispatch();
  const { language } = useParams();

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(language || "hi")
      .then((arr) => {
        dispatch(getWordsSuccess(arr));
        setLoading(false); // Set loading to false when words are fetched
      })
      .catch((err) => dispatch(getWordsFail(err)));
  }, [dispatch, language]);

  const { words, error } = useSelector((state) => state.root);

  useEffect(() => {
    if (error) {
      console.log(error);
      alert(error);
      dispatch(clearState());
    }
  }, [error, dispatch]);

  const handleChange = () => {
    if (ans === '') {
      toast.error('Please select an option');
      return;
    }
    setResult((prev) => [...prev, ans]);
    setCount((prev) => prev + 1);
    setAns('');
  };

  useEffect(() => {
    let timeoutId;
    if (words && count === words.length) {
      console.log(result);
      dispatch(saveResult(result));
      timeoutId = setTimeout(() => {
        navigate('/result');
      }, 2000); // Wait for 2 seconds before navigating
    }
    return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount or update
  }, [count, result, words, dispatch, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Display loading state while words are being fetched
  }

  if (count < words.length) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
          <div>
            <p className="text-lg font-semibold mb-4 text-white">
              Question {count + 1}: What does {`"${words[count].word}"`} mean?
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            {words[count].options.map((option, index) => (
              <label key={index} className="flex items-center text-white">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  onChange={(e) => setAns(e.target.value)}
                  checked={ans === option}
                  className="form-radio text-blue-500 h-4 w-4"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
            <button
              onClick={handleChange}
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default RadioGroup;