import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

import fileGendiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testCases = [
  [
    testName = 'gendiff-json',
    filepath1 = `${__dirname}/../__fixtures__/file1.json`,
    filepath2 = `${__dirname}/../__fixtures__/file2.json`,
    expectedPath = `${__dirname}/../__fixtures__/file1_file2_diff_stylish.txt`,
    format = 'stylish'
  ],
  [
    testName = 'gendiff-yaml',
    filepath1 = `${__dirname}/../__fixtures__/file1.yml`,
    filepath2 = `${__dirname}/../__fixtures__/file2.yml`,
    expectedPath = `${__dirname}/../__fixtures__/file1_file2_diff_stylish.txt`,
    format = 'stylish'
  ],
  [
    testName = 'gendiff-json-format-plain',
    filepath1 = `${__dirname}/../__fixtures__/file1.json`,
    filepath2 = `${__dirname}/../__fixtures__/file2.json`,
    expectedPath = `${__dirname}/../__fixtures__/file1_file2_diff_plain.txt`,
    format = 'plain'
  ],
  [
    testName = 'gendiff-json-format-json',
    filepath1 = `${__dirname}/../__fixtures__/file1.json`,
    filepath2 = `${__dirname}/../__fixtures__/file2.json`,
    expectedPath = `${__dirname}/../__fixtures__/file1_file2_diff_json.txt`,
    format = 'json'
  ]
];

test.each(testCases)(
  (filepath1, filepath2, expectedPath, format) => {
    const expected = readFileSync(expectedPath).toString();
    expect(fileGendiff(filepath1, filepath2, format)).toStrictEqual(expected);
  }
);