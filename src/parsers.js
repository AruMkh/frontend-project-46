import { load } from 'js-yaml';

const parseFile = (data, fileExt) => {
  switch (fileExt) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return load(data);
    default:
      throw new Error(`unknown file extension: ${fileExt}`);
  }
};

export default parseFile;
