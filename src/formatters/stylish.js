import _ from 'lodash';
import {
  KEY_UNCHANGED,
  KEY_ADDED,
  KEY_DELETED,
  KEY_UPDATED,
  KEY_NESTED_DIFF,
} from '../consts.js';

const formatLine = (idents, sign, key, value) => `${idents}${sign} ${key}: ${value}\n`;
const spaceMultiplier = 4;

const formatValue = (val, nestingLevel) => {
  if (_.isObject(val) && !_.isNull(val)) {
    const objectKeys = Object.keys(val);
    const idents = ' '.repeat((nestingLevel + 1) * spaceMultiplier);
    const result = objectKeys.map((key) => `${idents}${key}: ${formatValue(val[key], nestingLevel + 1)}\n`).join('');
    const bracketIdents = ' '.repeat(nestingLevel * spaceMultiplier);
    return `{\n${result}${bracketIdents}}`;
  }
  return val ? val.toString() : null;
};

const formatObjectDiff = (objectDiff, nestingLevel) => {
  const idents = ' '.repeat(nestingLevel * spaceMultiplier + 2);
  const lines = objectDiff.map((currDiff) => {
    switch (currDiff.keyStatus) {
      case KEY_UNCHANGED:
        return formatLine(idents, ' ', currDiff.key, formatValue(currDiff.value1, nestingLevel + 1));
      case KEY_ADDED:
        return formatLine(idents, '+', currDiff.key, formatValue(currDiff.value2, nestingLevel + 1));
      case KEY_DELETED:
        return formatLine(idents, '-', currDiff.key, formatValue(currDiff.value1, nestingLevel + 1));
      case KEY_UPDATED:
        return [
          formatLine(idents, '-', currDiff.key, formatValue(currDiff.value1, nestingLevel + 1)),
          formatLine(idents, '+', currDiff.key, formatValue(currDiff.value2, nestingLevel + 1)),
        ];
      case KEY_NESTED_DIFF:
        return formatLine(idents, ' ', currDiff.key, formatObjectDiff(currDiff.children, nestingLevel + 1));
      default:
        throw new Error(`Unknown key status: ${currDiff.keyStatus}`);
    }
  });
  const result = lines.flat().join('');
  const lastIdents = ' '.repeat(nestingLevel * spaceMultiplier);
  return `{\n${result}${lastIdents}}`;
};

const stylishFormatter = (diff) => formatObjectDiff(diff, 0);

export default stylishFormatter;
