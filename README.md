# forger
Async utilities and helpers for node

## `doWhile(mainFn, testFn)`

It will execute `mainFn()` for as long, as conditional `testFn()` function
returns true and then will resolve the promise.

```
doWhile(mainFn, testFn)
  .then(onResolve, onReject)
```

## `failover(func1, func2, ..., funcN)`

`failover`  will attempt to execute failover methods in sequence
until one of them continues with  `data`. It returns promise that is resolved
if at least one of the methods succeeded, and failed otherwise.

```
failover(method1, method2)
  .then(onResolve, onReject)
```

Each failover method is expected to have signature `method(next)`, where:
- `next(data)` is sequence continuation callback takes 0 or 1 parameter
  - `data` - processed data

> Note that unlike other methods `next()` doesn't take error parameters.
> It is because failover methods are expected to fail by default


## `parallel(func1, func2, ..., funcN)`

It will execute all function in parallel and resolve promise after all
methods completed successfully.

```
parallel(method1, method2)
  .then(onResolve, onReject)
```

Each parallel method is expected to have signature `method(next)`, where:
- `next(err)` is sequence continuation callback takes 0 or 1 parameter
  - `error` - `Error` type object

## `sequence(func1, func2, ..., funcN)`

It will execute all function in a sequence and resolve promise after all
methods completed successfully.

```
sequence(method1, method2)
  .then(onResolve, onReject)
```

Each sequence method is expected to have signature `method(next)`, where:
- `next(err, data)` is sequence continuation callback takes 0 or 1 parameter
  - `error` - `Error` type object
