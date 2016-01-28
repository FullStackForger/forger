'use strict'

module.exports = {
  doWhile: doWhile,
  parallel: parallel,
  sequence: sequence
}

function doWhile(mainFn, testFn) {
  let cycle = function(mainFn, testFn, finish) {
      if (testFn()) {
        try {
    		  mainFn((err) => {
            if (err) return finish(err)
            cycle(mainFn, testFn, finish)
          })
        } catch(err) {
          finish(err)
        }
      } else {
        finish()
      }
  }

  return new Promise((resolve, reject) => {
    cycle(mainFn, testFn, (err) => {
      if (err) return reject(err)
      return resolve()
    })
  })
}

function parallel(/*method1, ..., methodN*/) {
  return new Promise((resolve, reject) => {
    let total = arguments.length
    let resolved = 0
    let broken = false
    let complete = function (err, result) {
      if (broken) return
      if (err) {
        broken = true;
        return reject(err)
      }
      resolved ++
      if (resolved == total) resolve()
    }
    for (var i = 0; i < arguments.length; i++ ) {
      arguments[i](complete)
    }
  })
}

function sequence(/*method1, ..., methodN*/) {
  return new Promise((resolve, reject) => {
    let total = arguments.length
    let resolved = 0
    let methods = arguments
    let complete = function (err) {
        if (err) return reject(err)
        resolved++
        if (resolved == total) return resolve()
        methods[resolved](complete)
    }
    let execute = function (next) {
      try {
        methods[resolved](next)
      } catch (err) {
        reject(err)
      }
    }

    execute(complete)
  })
}
