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

## `sequence(func1, func2, ..., funcN)`

It will execute all function in a sequence and resolve promise after all
methods completed successfully.

```
sequence(method1, method2)
  .then(onResolve, onReject)
```

Each sequence method is expected to have signature `method(next)`, where:
- `next(err, data)` is sequence continuation callback taking 2 parameters
  - `error` - `Error` type object
