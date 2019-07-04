import { expect } from 'chai';
import { spy } from 'sinon';

import tryCatchAsyncHandler from '@app/utils/trycatch-async-handler.util';

describe('tryCatchAsyncHandlerUtil', () => {
  it('should catch exceptions of a function passed into it', async () => {
    const error = new Error('catch me!');
    const foo = tryCatchAsyncHandler(() => {
      throw error;
    });

    expect(foo).to.throw(error);
  });

  it('should call next with the error when an async function passed into it throws', async () => {
    const error = new Error('catch me!');
    const next = spy();
    const foo = tryCatchAsyncHandler(async () => {
      throw error;
    });

    await foo(null, null, next);
    expect(next.calledWith(error)).to.equal(true);
  });

  it('should call next with the arguments when an async function passed into it calls next', async () => {
    const next = spy();
    const foo = tryCatchAsyncHandler(async (req, res, next) => {
      next('test');
    });

    await foo(null, null, next);
    expect(next.calledWith('test')).to.equal(true);
  });

  it('should provide additional arguments to the middleware', async () => {
    const next = spy();
    const id = '1';
    const foo = tryCatchAsyncHandler(async (req, res, next, id) => {
      return id;
    });

    const result = await foo(null, null, next, id);
    expect(result).to.equal(id);
  });

  it('should accept a non-async function', async () => {
    const next = spy();
    const foo = tryCatchAsyncHandler((req, res, next) => {
      next('test');
    });

    await foo(null, null, next);
    expect(next.calledWith('test')).to.equal(true);
  });

  it('should accept a non-async function erroring', async () => {
    const error = new Error('catch me!');
    const next = spy();
    const foo = tryCatchAsyncHandler((req, res, next) => {
      next(error);
    });

    await foo(null, null, next);
    expect(next.calledWith(error)).to.equal(true);
  });

  // NB, thenables are not guaranteed to have a `catch` method.
  it('should handle thenables', async () => {
    const error = Error('catch me!');
    // construct a minimalist thenable which we can fail at a specific time
    let thenable, triggerFailure;
    const registeringThenable = new Promise(res => {
      thenable = {
        then: spy((success, fail) => {
          triggerFailure = fail;
          res();
        })
      };
    });

    // test the actual library feature
    const next = spy();
    const catchingThenable = tryCatchAsyncHandler(() => thenable)(null, null, next);
    await registeringThenable;
    expect(thenable.then.called).to.equal(true);
    expect(next.called).to.equal(false);
    triggerFailure(error);
    await catchingThenable;
    expect(next.calledWith(error)).to.equal(true);
  });
});