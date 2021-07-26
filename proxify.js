const proxify = (obj) =>
  new Proxy(obj, {
    has: (target, prop) => target.hasOwnProperty(prop),
  });
