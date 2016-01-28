'use strict'
const
  should = require('should'),
  forger = require('../')

describe('#sequence()', function () {
  let sequence = forger.sequence

  it('should execute all SYNC methods and resolve', function (done) {
    let run = function (data, next) {
      next(null,  data ? data * 2 : 10)
    }

    sequence(run, run, run).then((data) => {
      data.should.be.exactly(40)
      done()
    }).catch((err) => {
      done(err)
    })
  })


  it('should execute all ASYNC methods and resolve', function (done) {
    let run = function (data, next) {
      setTimeout(() => {
        next(null,  data ? data * 2 : 10)
      })
    }

    sequence(run, run, run).then((data) => {
      data.should.be.exactly(40)
      done()
    }).catch((err) => {
      done(err)
    })
  })

  it('should reject upon thrown error', function (done) {
    let
      errMsg = 'Expected error',
      solved = 0,
      goodFn = function (data, next) { solved++; next() },
      badFn = function (data, next) { throw new Error(errMsg) }

    sequence(goodFn, badFn, goodFn).then(() => {
      done(new Error('Execution error'))
    }).catch((err) => {
      try {
        err.message.should.be.exactly(errMsg)
        solved.should.be.exactly(1)
        done()
      } catch (err) {
        done(err)
      }
    })
  })

  it('should reject when continued with error', function (done) {
    let
      errMsg = 'Expected error',
      solved = 0,
      goodFn = function (data, next) { solved++; next() },
      badFn = function (data, next) { setTimeout(() => next(new Error(errMsg))) }

    sequence(goodFn, badFn, goodFn).then(() => {
      done(new Error('Execution error'))
    }).catch((err) => {
      try {
        err.message.should.be.exactly(errMsg)
        solved.should.be.exactly(1)
        done()
      } catch (err) {
        done(err)
      }
    })
  })
})
