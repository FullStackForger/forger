'use strict'
const
  should = require('should'),
  forger = require('../')

describe('#failover', function () {
  const failover = forger.failover

  let failures = 0
  let succeedSync = function (next) { next(failures) }
  let succeedAsync = function (next) { setTimeout(() => { next(failures) }) }
  let failSync = function (next) { failures++; next() }
  let failAsync = function (next) { setTimeout(() => { failSync(next) }) }

  beforeEach(function () { failures = 0 })

  describe('resolves', function () {

    it('should execute only first successful SYNC method', function (done) {
      failover(succeedSync, succeedSync, succeedSync).then((data) => {
        data.should.be.exactly(0)
        done()
      }).catch((err) => done(err))
    })

    it('should continue till first successful SYNC method', function (done) {
      failover(failSync, failSync, succeedSync).then((data) => {
        data.should.be.exactly(2)
        done()
      }).catch((err) => done(err))
    })

    it('should execute only first successful ASYNC method', function (done) {
      failover(succeedAsync, succeedAsync, succeedAsync).then((data) => {
        data.should.be.exactly(0)
        done()
      }).catch((err) => done(err))
    })


    it('should continue till first successful ASYNC method', function (done) {
      failover(failAsync, failAsync, succeedAsync).then((data) => {
        data.should.be.exactly(2)
        done()
      }).catch((err) => done(err))
    })
  })

  describe('rejections', function () {

    it('sould reject if none of SYNC methods continue with data', function (done) {
      failover(failSync, failSync, failSync).then((data) => {
        done(new Error('Failover promise was expected to be rejected'))
      }).catch((err) => {
        try {
          err.should.be.an.instanceOf(Error)
          err.message.should.be.exactly('All tempted methods failed')
          done();
        } catch (err) { done(err) }
      })
    })

    it('sould reject if none of ASYNC methods continue with data', function (done) {
      failover(failAsync, failAsync, failAsync).then((data) => {
        done(new Error('Failover promise was expected to be rejected'))
      }).catch((err) => {
        try {
          err.should.be.an.instanceOf(Error)
          err.message.should.be.exactly('All tempted methods failed')
          done();
        } catch (err) { done(err) }
      })
    })
  })

})
