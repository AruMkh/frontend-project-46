import _ from 'lodash';

import {
  KEY_UNCHANGED,
  KEY_ADDED,
  KEY_DELETED,
  KEY_UPDATED,
  KEY_NESTED_DIFF,
} from './consts.js';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = [...new Set(keys1.concat(keys2))];
  const sortedKeys = _.sortBy(allKeys);

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const data1hasproparty = _.has(data1, key);
    const data2hasproparty = _.has(data2, key);

    if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 != null) {
      return {
        keyStatus: KEY_NESTED_DIFF,
        key,
        children: genDiff(value1, value2),
      };
    }
    if (!data2hasproparty) {
      return { keyStatus: KEY_DELETED, key, value1 };
    }
    if (!data1hasproparty) {
      return { keyStatus: KEY_ADDED, key, value2 };
    }
    if (value1 === value2) {
      return {
        keyStatus: KEY_UNCHANGED,
        key,
        value1,
      };
    }
    return {
      keyStatus: KEY_UPDATED,
      key,
      value1,
      value2,
    };
  });
};

export default genDiff;
