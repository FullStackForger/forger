'use strict'
const
  should = require('should'),
  forger = require('../')

describe('#doWhile()', function () {
  let doWhile = forger.doWhile

  it('should execute mainFn() (3 times) and resolve promise', function (done) {
    let
      counter = 0,
      mainFn = function (next) { counter++; return next() },
      testFn = function () { return counter < 3 }

    doWhile(mainFn, testFn).then(() => {
      counter.should.be.exactly(3).and.be.a.Number();
      done()
    }).catch((err) => {
      throw new Error('Execution error')
    })
  })

  it('should reject if mainFn() errors', function (done) {
    let
      errMsg = 'Expected error',
      mainFn = function (next) { throw new Error(errMsg) },
      testFn = function () { return true }

    doWhile(mainFn, testFn).then(() => {
      done(new Error('Execution error'))
    }).catch((err) => {
      err.message.should.be.exactly(errMsg)
      done()
    })
  })

  it('should reject if mainFn() continues with error', function (done) {
    let
      errMsg = 'Expected error',
      mainFn = function (next) { next(new Error(errMsg)) },
      testFn = function () { return true }

    doWhile(mainFn, testFn).then(() => {
      console.log('tya')
      done(new Error('Execution error'))
    }).catch(function (err) {
      err.message.should.be.exactly(errMsg)
      done()
    })
  })

  it('should reject if testFn() errors', function (done) {
    let
      errMsg = 'Expected error',
      mainFn = function (next) { next },
      testFn = function () { throw new Error(errMsg) }

    doWhile(mainFn, testFn).then(() => {
      done(new Error('Execution error'))
    }).catch((err) => {
      err.message.should.be.exactly(errMsg)
      done()
    })
  })
})
