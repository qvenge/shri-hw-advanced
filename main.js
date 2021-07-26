const { assert } = chai;

mocha.setup({
  timeout: '10000',
  ui: 'bdd',
});

describe('allKeysAndSymbols', () => {
  it('allKeysAndSymbols({}) returns ["ha", "constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", ...]', () => {
    const result = allKeysAndSymbols({ ha: 'he' });
    assert.deepEqual(result.slice(0, 5), [
      'ha',
      'constructor',
      '__defineGetter__',
      '__defineSetter__',
      'hasOwnProperty',
    ]);
  });
});

describe('proxy', () => {
  let object, symbol;

  beforeEach(() => {
    const proto = { value: 42 };
    object = Object.create(proto);

    Object.defineProperty(object, 'year', {
      value: 2020,
      writable: true,
      configurable: true,
      enumerable: false,
    });

    symbol = Symbol('bazzinga');
    object[symbol] = 42;
  });

  describe('без proxy', () => {
    it(`'value' in object === true`, () => {
      assert.isTrue('value' in object);
    });
    it(`'year' in object === true`, () => {
      assert.isTrue('year' in object);
    });
    it(`symbol in object === true`, () => {
      assert.isTrue(symbol in object);
    });
  });

  describe('с proxy', () => {
    let proxy;

    beforeEach(() => {
      proxy = proxify(object);
    });

    it(`'value' in proxy === false`, () => {
      assert.isFalse('value' in proxy);
    });
    it(`'year' in proxy === true`, () => {
      assert.isTrue('year' in proxy);
    });
    it(`symbol in proxy === true`, () => {
      assert.isTrue(symbol in proxy);
    });
  });
});

describe('MySet', () => {
  describe('первый набор тестов для MySet (set = new MySet([4, 8, 15, 15, 16, 23, 42]))', () => {
    let set;

    beforeEach(() => {
      set = new MySet([4, 8, 15, 15, 16, 23, 42]);
    });

    it('хранит только уникальные значения, [...set] == [4, 8, 15, 16, 23, 42]', () => {
      assert.deepEqual([...set], [4, 8, 15, 16, 23, 42]);
    });

    it('set.size === 6', () => {
      assert.strictEqual(set.size, 6);
    });

    it('работает в цикле for-of', () => {
      const result = [];
      for (const item of set) {
        result.push(item);
      }
      assert.deepEqual(result, [4, 8, 15, 16, 23, 42]);
    });

    it('есть метод keys', () => {
      const result = [];
      for (const item of set.keys()) {
        result.push(item);
      }
      assert.deepEqual(result, [4, 8, 15, 16, 23, 42]);
    });

    it('есть метод values', () => {
      const result = [];
      for (const item of set.values()) {
        result.push(item);
      }
      assert.deepEqual(result, [4, 8, 15, 16, 23, 42]);
    });

    it('есть метод entries', () => {
      const result = [];
      for (const item of set.entries()) {
        result.push(item);
      }
      assert.deepEqual(result, [
        [4, 4],
        [8, 8],
        [15, 15],
        [16, 16],
        [23, 23],
        [42, 42],
      ]);
    });

    it('есть метод clear', () => {
      set.clear();
      assert.strictEqual(set.size, 0);
    });
  });

  describe('второй набор тестов для MySet', () => {
    let object, data;

    beforeEach(() => {
      object = {
        getValue() {
          return this.value;
        },
      };
      data = { value: 42 };
    });

    describe('есть метод add (set = new MySet()', () => {
      it('set.add(object).add(object); [...set] === [object, data]', () => {
        const set = new MySet();
        set.add(object).add(data);
        assert.deepEqual([...set], [object, data]);
      });
    });

    describe('есть метод delete (set = new MySet([data])', () => {
      beforeEach(() => {
        set = new MySet([data]);
      });

      it('set.delete(data); set.size === 0', () => {
        set.delete(data);
        assert.strictEqual(set.size, 0);
      });

      it('set.delete(object) returns false', () => {
        assert.isFalse(set.delete(object));
      });

      it('set.delete(data) returns true', () => {
        assert.isTrue(set.delete(data));
      });
    });

    describe('есть метод has (set = new MySet([object]))', () => {
      beforeEach(() => {
        set = new MySet([object]);
      });

      it('set.has({}) === false', () => {
        assert.isFalse(set.has({}));
      });

      it('set.has(object) === true', () => {
        assert.isTrue(set.has(object));
      });

      it('set.has(data) === false', () => {
        assert.isFalse(set.has(data), false);
      });
    });

    describe('и кое-что еще', () => {
      beforeEach(() => {
        set = new MySet();
      });

      it('set === set.valueOf()', () => {
        assert.strictEqual(set, set.valueOf());
      });

      it('String(set) === "[object MySet]"', () => {
        assert.strictEqual(String(set), '[object MySet]');
      });

      it('Object.prototype.toString.call(set) === "[object MySet]"', () => {
        assert.strictEqual(Object.prototype.toString.call(set), '[object MySet]');
      });
    });

    it('есть forEach в который можно передать контекст', () => {
      const set = new MySet([object]);
      const result = [];
      set.forEach(function (item) {
        result.push(item.getValue.call(this)); // 42
      }, data);
      assert.deepEqual([...result], [42]);
    });
  });
});

mocha.run();
