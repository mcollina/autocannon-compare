#! /usr/bin/env node
'use strict'

const fs = require('fs')
const ttest = require('ttest')

function compare (a, b) {
  const aRequests = a.requests.total
  const bRequests = b.requests.total

  const res = {
    requests: calculate(a.requests, b.requests, aRequests, bRequests),
    throughput: calculate(a.throughput, b.throughput, aRequests, bRequests),
    latency: calculate(a.latency, b.latency, aRequests, bRequests)
  }

  const aWins =
    res.requests.difference.indexOf('-') < 0 &&
    res.requests.significant.indexOf('*') >= 0

  const bWins =
    res.requests.difference.indexOf('-') >= 0 &&
    res.requests.significant.indexOf('*') >= 0

  res.aWins = aWins
  res.bWins = bWins
  res.equal = !aWins && !bWins

  return res
}

function calculate (a, b, samplesA, samplesB) {
  const stat = ttest(asData(a, samplesA), asData(b, samplesB))

  const difference = (Math.round((a.mean - b.mean) / b.mean * 100 * 100, 2) / 100) + '%'

  return {
    difference,
    pValue: stat.pValue(),
    significant: asSignificant(stat.pValue())
  }
}

function asData (obj, samples) {
  const res = {
    mean: obj.mean,
    variance: Math.pow(obj.stddev, 2),
    size: samples
  }
  return res
}

function asSignificant (value) {
  var significant = ''

  if (value < 0.001) {
    significant = '***'
  } else if (value < 0.01) {
    significant = '**'
  } else if (value < 0.05) {
    significant = '*'
  }

  return significant
}

module.exports = compare

if (require.main === module) {
  cli()
}

function cli () {
  const args = process.argv.slice(2)

  if (args.length !== 2) {
    console.log('Usage: autocannon-compare A B')
    process.exit(1)
  }

  fs.readFile(args[0], function (err, data) {
    if (err) {
      throw err
    }

    const A = JSON.parse(data)

    fs.readFile(args[1], function (err, data) {
      if (err) {
        throw err
      }

      const B = JSON.parse(data)

      console.log(JSON.stringify(compare(A, B), null, 2))
    })
  })
}