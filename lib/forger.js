'use strict'

module.exports = {
  doWhile: doWhile
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
