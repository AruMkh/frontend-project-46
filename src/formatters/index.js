import stylish from './stylish.js';
import plain from './plain.js';

const format = (tree, formatFile) => {
  const parserByFormat = {
    stylish: stylish(tree),
    plain: plain(tree),
    json: JSON.stringify(tree),
  };
  return parserByFormat[formatFile];
};

export default format;
