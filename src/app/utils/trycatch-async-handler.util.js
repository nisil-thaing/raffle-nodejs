function tryCatchAsyncHandler(func) {
  return (...args) => {
    const resolveFn = func(...args);
    const nextFn = args[args.length - 1];

    return Promise.resolve(resolveFn).catch(nextFn);
  };
}

export default tryCatchAsyncHandler;