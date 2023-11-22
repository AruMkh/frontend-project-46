import { readFileSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';

import genDiff from './gendiff.js';
import parseFile from './parsers.js';
import getFormatter from './formatters/index.js';

const fileGendiff = (filepath1, filepath2, format) => {
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
