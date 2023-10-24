import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import generateDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJson.txt');

test.each(['json', 'yml'])('%s test', (format) => {
  const file1 = getFixturePath(`filepath1.${format}`);
  const file2 = getFixturePath(`filepath2.${format}`);
  expect(generateDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
  expect(generateDiff(file1, file2, 'plain')).toEqual(expectedPlain);
  expect(generateDiff(file1, file2, 'json')).toEqual(expectedJson);
});
