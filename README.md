# forger
Async utilities and helpers for node

## `doWhile(mainFn, testFn)`

It will execute `mainFn()` for as long, as conditional `testFn()` function
returns true and then will resolve the promise.

```
doWhile(mainFn, testFn)
  .then(onResolve, onReject)
```

## `parallel(func1, func2, ..., funcN)`

It will execute all function in parallel and resolve promise after all
methods completed successfully.

```
parallel(method1, method2)
  .then(onResolve, onReject)
```
