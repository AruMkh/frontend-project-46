import yaml from 'js-yaml';

const parseFile = (data, typeFile) => {
  const parserByType = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  };
  return parserByType[typeFile](data);
};

export default parseFile;
