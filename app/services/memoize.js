function memoize(method) {
  let cache = {};

  return async function() {
      let args = JSON.stringify(arguments);
      console.log('MEMOIZE ARGS ',args);
      cache[args] = cache[args] || method.apply(this, arguments);
      console.log('MEMOIZE cache[ARGS] ',cache[args]);

      return cache[args];
  };
}

module.exports = memoize;