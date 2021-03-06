# A skiplist implementation in javascript

Because I wanted to understand skip lists.

[![npm](http://img.shields.io/npm/v/skiplist.svg?style=flat)](https://www.npmjs.org/package/skiplist) [![Tests](http://img.shields.io/travis/ceejbot/skiplist.svg?style=flat)](http://travis-ci.org/ceejbot/skiplist) [![Coverage Status](https://img.shields.io/coveralls/ceejbot/skiplist.svg?style=flat)](https://coveralls.io/github/ceejbot/skiplist?branch=master)    [![Dependencies](https://david-dm.org/ceejbot/skiplist.svg)](https://david-dm.org/ceejbot/skiplist)

##

```javascript
var assert = require('assert');
var Skiplist = require('skiplist');

var list = new Skiplist();
list.insert('cat', 'Cats are the best animal.');
list.insert('dog', 'Dogs are obviously inferior.');
list.insert('coati', 'Coatis have long tails.');

var value = list.match('cat');
assert(value === 'Cats are the best animal.');

var result = list.find('co');
assert(result.length === 2);
assert(result[0][0] === 'coati');
assert(result[1][0] === 'dog');

var wasRemoved = list.remove('dog');
assert(list.length() === 2);
```

## See also

[The Wikipedia entry on skip lists](https://en.wikipedia.org/wiki/Skip_list).

[A Python implementation](http://infohost.nmt.edu/tcc/help/lang/python/examples/pyskip/web/index.html). [Another one](http://pythonsweetness.tumblr.com/post/45227295342/fast-pypy-compatible-ordered-map-in-89-lines-of-python).
