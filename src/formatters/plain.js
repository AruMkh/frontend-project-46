import _ from 'lodash';

const getValue = (obj) => {
  if (_.isString(obj)) {
    return `'${obj}'`;
  }
  if (_.isObject(obj)) {
    return '[complex value]';
  }
  return obj;
};

const getPath = (acc, prop) => [...acc, prop].join('.');

const getInfo = {
  added: (element, iter, path) => `Property '${getPath(path, element.key)}' was added with value: ${getValue(element.value)}`,
  deleted: (element, iter, path) => `Property '${getPath(path, element.key)}' was removed`,
  updated: (element, iter, path) => `Property '${getPath(path, element.key)}' was updated. From ${getValue(element.oldValue)} to ${getValue(element.value)}`,
  unchanged: () => [],
  nested: (element, iter, path) => iter(element.children, [...path, element.key]),
};

const plain = (tree) => {
  const iter = (node, path) => {
    const dataToString = node.flatMap((elem) => getInfo[elem.type](elem, iter, path));
    return dataToString.join('\n');
  };
  return iter(tree, []);
};

export default plain;
