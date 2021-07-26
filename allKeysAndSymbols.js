const allKeysAndSymbols = (obj) => {
  const propNames = [];
  let curr = obj;

  while (curr) {
    propNames.push(...Object.getOwnPropertyNames(curr));
    curr = Object.getPrototypeOf(curr);
  }

  return propNames;
};
