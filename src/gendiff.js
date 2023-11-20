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
    const val1 = data1[key];
    const val2 = data2[key];
    if (Object.prototype.hasOwnProperty.call(data1, key)
        && Object.prototype.hasOwnProperty.call(data2, key)) {
      if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 != null) {
        return {
          keyStatus: KEY_NESTED_DIFF,
          key,
          children: genDiff(val1, val2),
        };
      }
      if (val1 === val2) {
        return {
          keyStatus: KEY_UNCHANGED,
          key,
          value1: val1,
        };
      }
      return {
        keyStatus: KEY_UPDATED,
        key,
        value1: val1,
        value2: val2,
      };
    }
    if (Object.prototype.hasOwnProperty.call(data1, key)) {
      return { keyStatus: KEY_DELETED, key, value1: val1 };
    }
    return { keyStatus: KEY_ADDED, key, value2: val2 };
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
