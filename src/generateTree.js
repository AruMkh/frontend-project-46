import _ from 'lodash';

const generateTree = (obj1, obj2) => {
  const keysFile1 = Object.keys(obj1);
  const keysFile2 = Object.keys(obj2);
  const allKeys = _.uniq([...keysFile1, ...keysFile2]);
  const sortedKeys = _.sortBy(allKeys);
  const result = sortedKeys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = generateTree(obj1[key], obj2[key]);
      return {
        type: 'nested', key, value: obj1[key], children,
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { type: 'added', key, value: obj2[key] };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { type: 'deleted', key, value: obj1[key] };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        type: 'updated', key, value: obj2[key], oldValue: obj1[key],
      };
    }
    return { type: 'unchanged', key, value: obj1[key] };
  });
  return result;
};

export default generateTree;
