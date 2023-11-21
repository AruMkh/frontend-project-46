import { load } from 'js-yaml';

const parseFile = (data, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return load(data);
    default:
      throw new Error(`unknown file extension: ${extension}`);
  }
};

export default parseFile;
