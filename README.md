# Persistent Object [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]

This library provides the ability to persist an object via sessionStorage or localStorage.

## Limitation
This library doesn't not work if your object consists of `Array` or `Object` properties.

## Installation
`npm install --save persistent-object-es6`

## Usage Summary

### Code

```
// Include library
const PersistentObjectES6 = require('persistent-object-es6');

// Extends your class - required
class FlatAssObject extends PersistentObjectES6 {

  constructor() {
    // Initialize it - required at the beginning of the constructor
    super('this-flat-ass-object-unique-name', 'Session');

    // Your class declaration here
    this.var1 = null;
    this.var2 = '';

    // Array and Object properties are not supported
    this.var3 = ['blah', 'blah'];
    this.var4 = {foo: 'blah', bar: 'blah'};

    // Create it - required at the end of the constructor
    return this.create();
  }
  
  // Your class methods here
  
  setVar1(val) {
    this.var1 = val;
  }
  
  getVar1() {
    return this.var1;
  }
  
  setVar2(val) {
    this.var2 = val;
  }
  
  getVar2() {
    return this.var2;
  }
}

// Instantiate your object
var flatAssObject = new FlatAssObject();
// Modify it
flatAssObject.var1 = 'not null';
flatAssObject.var2 = 'not empty';
```

```
// Later somewhere in your application, you redeclare this object
var flatAssObject2 = new FlatAssObject();
// Will return 'not null'
console.log(flatAssObject2.var1);
// Will return 'not empty'
console.log(flatAssObject2.var2);
```

## License
MIT - See included LICENSE.md

[travis-url]: https://travis-ci.org/alanzhaonys/persistent-object-es6
[travis-image]: https://travis-ci.org/alanzhaonys/persistent-object-es6.svg?branch=master

[coveralls-url]: https://coveralls.io/github/alanzhaonys/persistent-object-es6?branch=master
[coveralls-image]: https://coveralls.io/repos/github/alanzhaonys/persistent-object-es6/badge.svg?branch=master
