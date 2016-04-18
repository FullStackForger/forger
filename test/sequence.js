'use strict';
const
  should = require('should'),
  forger = require('../');

describe('#sequence()', function () {
  let data = 10;
  let sequence = forger.sequence;

  it('should execute all SYNC methods and resolve', function (done) {
    let run = function (next) {
      data *= 2;
      next(null);
    };

    sequence(run, run, run).then(() => {
      data.should.be.exactly(80);
      done();
    }).catch((err) => {
      done(err);
    });
  });


  it('should execute all ASYNC methods and resolve', function (done) {
    let data = 10;
    let run = function (next) {
      setTimeout(() => {
        data *= 2;
        next(null)
      })
    };

    sequence(run, run, run).then(() => {
      should(data).be.exactly(80);
      done()
    }).catch((err) => {
      done(err)
    });
  });

  it('should reject upon thrown error', function (done) {
    let
      errMsg = 'Expected error',
      solved = 0,
      goodFn = function (next) { solved++; next() },
      badFn = function (next) { throw new Error(errMsg) };

    sequence(goodFn, badFn, goodFn).then(() => {
      done(new Error('Execution error'))
    }).catch((err) => {
      try {
        err.message.should.be.exactly(errMsg);
        solved.should.be.exactly(1);
        done()
      } catch (err) {
        done(err)
      }
    });
  });

  it('should reject when continued with error', function (done) {
    let
      errMsg = 'Expected error',
      solved = 0,
      goodFn = function (next) { solved++; next() },
      badFn = function (next) { setTimeout(() => next(new Error(errMsg))) };

    sequence(goodFn, badFn, goodFn).then(() => {
      done(new Error('Execution error'))
    }).catch((err) => {
      try {
        err.message.should.be.exactly(errMsg);
        solved.should.be.exactly(1);
        done();
      } catch (err) {
        done(err)
      }
    });
  })
});
