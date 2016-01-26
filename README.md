# forger
Async utilities and helpers for node

## `doWhile(mainFn, testFn)`

Method returns `Promise` object. It will execute `mainFn()` for as long,
as conditional `testFn()` function returns true and then will resolve the promise.

```
doWhile(mainFn, testFn)
  .then(onResolve, onReject)
```
