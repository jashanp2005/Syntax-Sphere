import axios from "axios";
import { generate } from "random-words";
import _ from 'lodash';

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

