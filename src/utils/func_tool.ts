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
