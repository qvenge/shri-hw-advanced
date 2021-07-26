const arrayHas = (arr, value) => arr.some((item) => Object.is(item, value));

class MySet {
  constructor(arr) {
    this.uniqs = arr.reduce((uniqs, val) => (arrayHas(uniqs, val) ? uniqs : [...uniqs, val]), []);
  }

  add(value) {
    if (!this.has(value)) this.uniqs.push(value);
    return this;
  }

  delete(value) {
    const index = this.uniqs.findIndex((item) => Object.is(item, value));
    if (index === -1) return false;
    this.uniqs.splice(index, 1);
    return true;
  }

  has(value) {
    return arrayHas(this.uniqs, value);
  }

  keys() {
    return this[Symbol.iterator]();
  }

  values() {
    return this[Symbol.iterator]();
  }

  *entries() {
    for (const val of this.values()) yield [val, val];
  }

  clear() {
    this.uniqs = [];
  }

  valueOf() {
    return this;
  }

  forEach(callback, context) {
    for (const value of this.values()) {
      callback.call(context, value, value, this);
    }
  }

  *[Symbol.iterator]() {
    for (let item of this.uniqs) yield item;
  }

  get size() {
    return this.uniqs.length;
  }

  get [Symbol.toStringTag]() {
    return MySet.name;
  }
}
