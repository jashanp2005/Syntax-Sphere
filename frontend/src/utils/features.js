import axios from "axios";
import { generate } from "random-words";
import _ from 'lodash';

const generateMCQ = (meaning, index) => {
  const correctAnswer = meaning[index].Text;
  const incorrectArray = meaning.filter((item) => item.Text !== correctAnswer);
  const incorrectOptions = _.sampleSize(incorrectArray, 3).map((item) => item.Text);
  const mcqOptions = _.shuffle([...incorrectOptions, correctAnswer]);
  return mcqOptions;
}

export const translateWords = async (params) => {
  try {
    const words = (generate({ exactly: 8 })).map((item) => ({
      Text: item,
    }));

    const apikey = import.meta.env.VITE_MICROSOFT_KEY;

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": params,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          'x-rapidapi-key': 'a62754f4e8mshe588b643993cf98p1648dfjsnea4f48080007',
          'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
      }
    );

    const receive = response.data;

    const arr = receive.map((i, idx) => {
      const options = generateMCQ(words, idx);

      return {
        word: i.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });

    return arr;
  } catch (error) {
    console.log(error);
    throw new Error("Some Error");
  }
};

export const countMatchingElements = (arr1, arr2) => {
    if (arr1.length !== arr2.length){
        console.log('length of both arrays is different');
        return;
    }
    let matchedCount = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) matchedCount++;
    }
    return matchedCount;
}

export const fetchAudio = async (text, language) => {
  const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;
  const rapidKey = import.meta.env.VITE_RAPID_API;

  const encodedParams = new URLSearchParams({
    src: text,
    r: "0",
    c: "mp3",
    f: "8khz_8bit_mono",
    b64: "true",
  });

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

  const response = await axios.post(
    "https://voicerss-text-to-speech.p.rapidapi.com/",
    encodedParams,
    {
      params: { key },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": rapidKey,
        "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
      },
    }
  );

  const data = response.data;
  return data;
};