'use strict'

module.exports = {
  doWhile: doWhile,
  doInParallel: doInParallel
}

function doWhile(mainFn, testFn) {
  let cycle = function(mainFn, testFn, finish) {
      if (testFn()) {
        try {
    		  mainFn(() => cycle(mainFn, testFn, finish))
        } catch(err) {
          finish(err)
        }
      } else {
        finish(null)
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
    let complete = function (err, result) {
      if (err) return reject(err)
      resolved ++
      if (resolved == total) resolve()
    }
    for (var i = 0; i < arguments.length; i++ ) {
      arguments[i](complete)
    }
  })
}
