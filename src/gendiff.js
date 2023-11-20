import { readFileSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';

import parseFile from './parsers.js';
import getFormatter from './formatters/index.js';
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
      return { keyStatus: KEY_DELETED, key, first: value1 };
  }
  if (!data1hasproparty) {
      return { keyStatus: KEY_ADDED, key, second: value2 };
  }
  if (value1 === value2) {
      return {
        keyStatus: KEY_UNCHANGED,
        key,
        value1: value1,
      };
  }
  return {
    keyStatus: KEY_UPDATED,
    key,
    value1: value1,
    value2: value2,
    };
  });
};

const fileGendiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = resolve(filepath1);
  const absolutePath2 = resolve(filepath2);

  const fileData1 = readFileSync(absolutePath1);
  const fileExt1 = _.last(absolutePath1.split('.'));

  const fileData2 = readFileSync(absolutePath2);
  const fileExt2 = _.last(absolutePath2.split('.'));

  const data1 = parseFile(fileData1, fileExt1);
  const data2 = parseFile(fileData2, fileExt2);
  const result = genDiff(data1, data2);

  const formatter = getFormatter(format);
  return formatter(result);
};

export default fileGendiff;
