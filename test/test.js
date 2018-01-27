'use strict';

const PersistentObjectES6 = require('../dist/index');
const expect = require('chai').expect;
// This persistentStorage global variable emulates sessionStorage
// and localStorage which persists data
const persistentStorage = storageMock();

class TestObject extends PersistentObjectES6 {

  constructor(name, storageType) {
    // Initialize it
    super(name, storageType, persistentStorage);

    this._var1 = null;
    this._var2 = '';
    this._var3 = [];
    this._var4 = {};

    // Create it
    return this.create();
  }

  set var1(val) {
    this._var1 = val;
  }

  get var1() {
    return this._var1;
  }

  setVar2(val) {
    this._var2 = val;
  }

  getVar2() {
    return this._var2;
  }

  addToVar3(val) {
    this._var3.push(val);
  }

  getVar3() {
    return this._var3;
  }

  addToVar4(key, val) {
    this._var4[key] = val;
  }

  getVar4() {
    return this._var4;
  }
}

describe('PersistentObjectES6', function() {
  it('PersistentObjectES6 Tests', function() {
    var testObject = new TestObject('i-am-a-test-object', 'Session');
    testObject.var1 = 'val1';
    testObject.setVar2('val2');
    testObject.addToVar3('val3-1');
    testObject.addToVar3('val3-2');
    testObject.addToVar4('key1', 'val4-1');
    testObject.addToVar4('key2', 'val4-2');

    var testObject2 = new TestObject('i-am-a-test-object', 'Session');

    // console.log(testObject2.object);

    expect(testObject2.var1).to.equal('val1');
    expect(testObject2.getVar2()).to.equal('val2');

    // Just to demonstrate that this won't work for Array and Object class properties
    expect(testObject2.getVar3()).to.deep.equal([]);
    expect(testObject2.getVar4()).to.deep.equal({});

    expect(testObject2._var1).to.equal('val1');
    expect(testObject2._var2).to.equal('val2');
    expect(testObject2.object._var1).to.equal('val1');
    expect(testObject2.object._var2).to.equal('val2');

    // delete testObject2.var1; // This doesn't work
    delete testObject2._var1;
    delete testObject2._var2;

    expect(testObject2.var1).to.equal(undefined);
    expect(testObject2.getVar2()).to.equal(undefined);

    var testObject3 = new TestObject('i-am-a-different-test-object', 'Session');

    expect(testObject3.var1).to.equal(null);
    expect(testObject3.getVar2()).to.equal('');

  });
});

function storageMock() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}
