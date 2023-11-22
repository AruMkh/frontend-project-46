import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

import fileGendiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testCases = [
  [
    'gendiff-json',
    `${__dirname}/../__fixtures__/file1.json`,
    `${__dirname}/../__fixtures__/file2.json`,
    `${__dirname}/../__fixtures__/file1_file2_diff_stylish.txt`,
    'stylish',
  ],
  [
    'gendiff-yaml',
    `${__dirname}/../__fixtures__/file1.yml`,
    `${__dirname}/../__fixtures__/file2.yml`,
    `${__dirname}/../__fixtures__/file1_file2_diff_stylish.txt`,
    'stylish',
  ],
  [
    'gendiff-json-format-plain',
    `${__dirname}/../__fixtures__/file1.json`,
    `${__dirname}/../__fixtures__/file2.json`,
    `${__dirname}/../__fixtures__/file1_file2_diff_plain.txt`,
    'plain',
  ],
  [
    'gendiff-json-format-json',
    `${__dirname}/../__fixtures__/file1.json`,
    `${__dirname}/../__fixtures__/file2.json`,
    `${__dirname}/../__fixtures__/file1_file2_diff_json.txt`,
    'json',
  ],
];

test.each(testCases)(
  '%s',
  (testName, filepath1, filepath2, expectedPath, format) => {
    const expected = readFileSync(expectedPath).toString();
    expect(fileGendiff(filepath1, filepath2, format)).toStrictEqual(expected);
  },
);
