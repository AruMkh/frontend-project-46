import stylish from './stylish.js';
import plain from './plain.js';

const format = (tree, formatFile) => {
  const objWithFormats = {
    stylish: stylish(tree),
    plain: plain(tree),
    json: JSON.stringify(tree),
  };
  return objWithFormats[formatFile];
};

export default format;
