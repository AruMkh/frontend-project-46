import _ from 'lodash';

const getIndent = (depth, defaultSpace = 4) => ' '.repeat(depth * defaultSpace - 2);

const stringify = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const objectToString = Object.entries(obj, depth)
    .map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return `{\n${objectToString.join('\n')}\n${getIndent(depth)}  }`;
};

const makeInfo = {
  nested: (element, depth, iter) => {
    const value = iter(element.children, depth + 1);
    return `${getIndent(depth)}  ${element.key}: ${value}\n${getIndent(depth)}  }`;
  },
  unchanged: (element, depth) => `${getIndent(depth)}  ${element.key}: ${stringify(element.value, depth)}`,
  deleted: (element, depth) => `${getIndent(depth)}- ${element.key}: ${stringify(element.value, depth)}`,
  added: (element, depth) => `${getIndent(depth)}+ ${element.key}: ${stringify(element.value, depth)}`,
  updated: (element, depth) => [
    `${getIndent(depth)}- ${element.key}: ${stringify(element.oldValue, depth)}`,
    `${getIndent(depth)}+ ${element.key}: ${stringify(element.value, depth)}`,
  ],
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const dataToString = node.flatMap((elem) => makeInfo[elem.type](elem, depth, iter));
    return `{\n${dataToString.join('\n')}`;
  };
  return `${iter(tree, 1)}\n}`;
};

export default stylish;
