#!/usr/bin/env node

import { Command } from 'commander';
import generateDiff from '../index.js';

const program = new Command();

program.version('0.0.1');

program.description('Compares two configuration files and shows a difference.');

program.arguments('<filepath1> <filepath2>');

program.action((filepath1, filepath2) => {
  const result = generateDiff(filepath1, filepath2, program.opts().format);
  console.log(result);
});

program.option('-f, --format <type>', 'output format', 'stylish');

program.parse();
