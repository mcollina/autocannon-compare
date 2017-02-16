![Autocannon](https://raw.githubusercontent.com/mcollina/autocannon/master/autocannon-banner.png)

# autocannon-compare

Compare two autocannon runs, using
[ttest](https://github.com/AndreasMadsen/ttest).

## Install

Locally, for [API](#api) usage

```
npm i autocannon-compare --save
```

Globally, for [CLI](#cli) usage

```
npm i autocannon-compare -g
```

## API

### compare(a, b)

Compare the result of two autocannon run.
It will tell how different is the `a` run compared
to tbe `b` run.

```js
{
  "requests": {
    "difference": "980.33%",
    "pValue": 0,
    "significant": "***"
  },
  "throughput": {
    "difference": "976.68%",
    "pValue": 0,
    "significant": "***"
  },
  "latency": {
    "difference": "-98.91%",
    "pValue": 0,
    "significant": "***"
  },
  "aWins": true,
  "bWins": false,
  "equal": false
}
```

### Example

```js
const compare = require('autocannon-compare')
const resA = require('./result-a')
const resB = require('./result-b')

console.log(compare(resA, resB))
```

## CLI

```
$ autocannon-compare fixture-a.json fixture-b.json
{
  "requests": {
    "difference": "980.33%",
    "pValue": 0,
    "significant": "***"
  },
  "throughput": {
    "difference": "976.68%",
    "pValue": 0,
    "significant": "***"
  },
  "latency": {
    "difference": "-98.91%",
    "pValue": 0,
    "significant": "***"
  },
  "aWins": true,
  "bWins": false,
  "equal": false
}
```

## Acknowledgements

This project was kindly sponsored by [nearForm](http://nearform.com).

## License

Copyright [Matteo Collina](https://github.com/mcollina), Licensed under [MIT](./LICENSE).
