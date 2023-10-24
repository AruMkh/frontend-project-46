import fs from 'fs';
import path from 'path';
import generateTree from './generateTree.js';
import parseFile from './parsers.js';
import format from './formatters/index.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf8');

const getFormat = (filepath) => path.extname(filepath).slice(1);

const generateDiff = (filepath1, filepath2, formatFile = 'stylish') => {
  const object1 = parseFile(readFile(filepath1), getFormat(filepath1));
  const object2 = parseFile(readFile(filepath2), getFormat(filepath2));
  const compareObj = format(generateTree(object1, object2), formatFile);
  return compareObj;
};

export default generateDiff;
