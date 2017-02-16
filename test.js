'use strict'

const test = require('tap').test
const compare = require('.')
const A = require('./fixture-a')
const B = require('./fixture-b')

test('compare two sets of data', function (t) {
  const result = compare(A, B)

  t.comment(JSON.stringify(result.requests))
  t.ok(result.requests, 'requests exists')
  t.equal(result.requests.difference, '980.33%')
  t.equal(result.requests.significant, '***')

  t.comment(JSON.stringify(result.throughput))
  t.ok(result.throughput, 'requests exists')
  t.equal(result.throughput.difference, '976.68%')
  t.equal(result.throughput.significant, '***')

  t.comment(JSON.stringify(result.latency))
  t.ok(result.latency, 'requests exists')
  t.equal(result.latency.difference, '-98.91%')
  t.equal(result.latency.significant, '***')

  t.ok(result.aWins)
  t.notOk(result.bWins)
  t.notOk(result.equal)

  t.end()
})

test('compare with itself', function (t) {
  const result = compare(A, A)

  t.comment(JSON.stringify(result.requests))
  t.ok(result.requests, 'requests exists')
  t.equal(result.requests.difference, '0%')
  t.equal(result.requests.significant, '')

  t.comment(JSON.stringify(result.throughput))
  t.ok(result.throughput, 'requests exists')
  t.equal(result.throughput.difference, '0%')
  t.equal(result.throughput.significant, '')

  t.comment(JSON.stringify(result.latency))
  t.ok(result.latency, 'requests exists')
  t.equal(result.latency.difference, '0%')
  t.equal(result.latency.significant, '')

  t.notOk(result.aWins)
  t.notOk(result.bWins)
  t.ok(result.equal)

  t.end()
})

test('compare reverse two sets of data', function (t) {
  const result = compare(B, A)

  t.comment(JSON.stringify(result.requests))
  t.ok(result.requests, 'requests exists')
  t.equal(result.requests.difference, '-90.74%')
  t.equal(result.requests.significant, '***')

  t.comment(JSON.stringify(result.throughput))
  t.ok(result.throughput, 'requests exists')
  t.equal(result.throughput.difference, '-90.71%')
  t.equal(result.throughput.significant, '***')

  t.comment(JSON.stringify(result.latency))
  t.ok(result.latency, 'requests exists')
  t.equal(result.latency.difference, '9083.33%')
  t.equal(result.latency.significant, '***')

  t.notOk(result.aWins)
  t.ok(result.bWins)
  t.notOk(result.equal)

  t.end()
})
