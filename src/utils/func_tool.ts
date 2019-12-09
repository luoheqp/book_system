export function bindAndPassContext(
  target: any,
  prop: string,
  descriptor?: PropertyDescriptor
) {
  const fn = target[prop];
  return {
    configurable: true,
    get: function() {
      const classInstance = this;
      function wrapperFn(this: any, ...args: any[]) {
        return fn.call(classInstance, this, ...args);
      }

      Object.defineProperty(this, prop, {
        configurable: true,
        writable: true,
        value: wrapperFn
      });

      return wrapperFn;
    }
  };
}

interface regObj {
  [propName: string]: RegExp;
}

export function regularCheck(target: string, reg: string) {
  const regList: regObj = {
    email: new RegExp(
      "^([A-Za-z0-9\\_\\-\\.])+@([A-Za-z0-9\\_\\-\\.])+.([A-Za-z]{2,4})$"
    )
  };

  if (!regList[reg]) {
    return false;
  }

  return regList[reg].test(target);
}
