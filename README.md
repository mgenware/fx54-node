# fx54-node

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg)](https://github.com/mgenware/MEAN-Module)
[![Build Status](https://travis-ci.org/mgenware/fx54-node.svg?branch=master)](http://travis-ci.org/mgenware/fx54-node)
[![npm version](https://badge.fury.io/js/fx54-node.svg)](https://badge.fury.io/js/fx54-node)
[![Node.js Version](http://img.shields.io/node/v/fx54-node.svg)](https://nodejs.org/en/)

Verify the existence or content of files with a hierarchical object.

## Installation
```sh
yarn add fx54-node
```

### Run tests
```sh
yarn test
```

## Example
Assume a directory like this:
```
- root
  - dir1
    a.txt 
  - dir2
    b.txt
```

Example code:
```javascript
import validator from 'fx54-node';
// Or Node.js style: const validator = require('fx54-node').default'

try {
  await validator.validateDirectoryAsync('./root', {
    dir1: {
      'a.txt': '<contents of a.txt>', // check the contents of a.txt
      'b.txt': false // make sure b.txt doesn't exist
    },
    dir2: {
      'b.txt': true, // make sure b.txt exists
    },
  });

  console.log('Validation succeeded');
} catch (err) {
  console.log(`Validation failed: ${err.message}`);
}
```

## API

* `async validateFileAsync(path: string, value: any)`: validates a file with a possible value.
  * `string` value: tests equality of the contents of file.
  * `boolean` value: verifies existence of the file.

* `async validateDirectoryAsync(path: string, obj: any)`: validates a directory with a hierarchical object. For example:
```javascript
{
  dirA: {
    subDirA: {
      file1: true,
    },
    subDirB: {
      file2: "<contents>",
    },
  },
  file3: false,
}
```
