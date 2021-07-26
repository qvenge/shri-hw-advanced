// ========================= allKeysAndSymbols ==============================
// console.log(allKeysAndSymbols({ ha: 'he' }));

// ========================= proxy ==============================

// ========================= MySet ==============================
const { assert } = chai;

mocha.setup({
  timeout: '10000',
  ui: 'bdd',
});

describe('MySet', () => {
  describe('первый набор тестов для MySet', () => {
    let set;

    beforeEach(() => {
      set = new MySet([4, 8, 15, 15, 16, 23, 42]);
    });

    it('хранит только уникальные значения', () => {
      assert.deepEqual([...set], [4, 8, 15, 16, 23, 42]);
    });

    it('есть свойство size', () => {
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
      for (const item of set.keys()) {
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

    it('есть метод add', () => {
      const set = new MySet();
      set.add(object);
      set.add(data);
      assert.deepEqual([...set], [object, data]);
    });

    it('есть метод delete', () => {
      const set = new MySet([data]);
      set.delete(data);
      assert.deepEqual([...set], []);
    });

    it('есть метод has', () => {
      const set = new MySet([object]);
      assert.strictEqual(set.has({}), false);
      assert.strictEqual(set.has(object), true);
      assert.strictEqual(set.has(data), false);
    });

    it('и кое-что еще', () => {
      const set = new MySet();
      assert.strictEqual(set, set.valueOf());
      assert.strictEqual(String(set), '[object MySet]');
      assert.strictEqual(Object.prototype.toString.call(set), '[object MySet]');
    });

    it('есть forEach', () => {
      const set = new MySet([object, data]);
      const result = [];
      set.forEach((item) => {
        result.push(item.getValue.call(this)); // 42
      });
      assert.deepEqual([...result], [42]);
    });
  });
});

mocha.run();
