import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/rootSlice";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState(0);
  const [audioSrc, setAudioSrc] = useState("");
  const audioRef = useRef(null);

  const {language} = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, words } = useSelector(
    (state) => state.root
  );

  const audioHandler = async () => {
    const player = audioRef.current;

    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count]?.word, language);
      setAudioSrc(data);
    }
  };

  const nextHandler = () => {
    setCount((prev) => prev + 1);
    setAudioSrc("");
  };

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(language || "hi")
      .then((arr) => dispatch(getWordsSuccess(arr)))
      .catch((err) => dispatch(getWordsFail(err)));

    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, [dispatch, language, error]);

  if (loading) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}

        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)}
            aria-label="Go back"
            className="p-2 rounded-full bg-gray-700 text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <h1 className="text-xl font-semibold flex-grow text-white">Learning Made Easy</h1>
        </div>

        <div className="p-4 bg-gray-700 rounded-lg mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl text-white">{count + 1} - {words[count]?.word}</h2>
            <h2 className="text-2xl text-blue-500">: {words[count]?.meaning}</h2>
            <button
              onClick={audioHandler}
              aria-label="Play audio"
              className="p-2 rounded-full bg-gray-700 text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <button
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
          onClick={count === words.length - 1 ? () => navigate(`/quiz/${language}`) : nextHandler}
        >
          {count === words.length - 1 ? "Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Learning;