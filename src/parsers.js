import yaml from 'js-yaml';

const parseFile = (data, typeFile) => {
  const objWithTypeFile = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  };
  return objWithTypeFile[typeFile](data);
};

export default parseFile;
