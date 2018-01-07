# fx54-node

[![Build Status](https://travis-ci.org/mgenware/fx54-node.svg?branch=master)](http://travis-ci.org/mgenware/fx54-node)
[![npm version](https://badge.fury.io/js/fx54.svg)](https://badge.fury.io/js/fx54)
[![Node.js Version](http://img.shields.io/node/v/fx54.svg)](https://nodejs.org/en/)

Verify existence or content of files with a hierarchical object.

```
- root
  - dir1
    a.txt 
  - dir2
    b.txt
```

```javascript
import validator from 'fx54-node';

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
  * `boolean` value: tests existence of the file.

* `async validateDirectoryAsync(path: string, obj: any)`: validates a directory with a hierarchical object. For example:
```javascript
{
  dirA: {
    subDirA: {
      file1: true,
    },
    subDirB: {
      file2: '<contents>`,
    },
  },
  file3: false,
}
```