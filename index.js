const co = require("co");

// EXAMPLE ASYNC FUNCTIONS -----------------
//
// Returns a promise that resolves with "foo" in 1 second.
// Note that the newly created Promise actually resolves inside a callback (setTimeout)
const waitForFoo = () => new Promise(resolve => {
  console.log("waiting for foo...");
  setTimeout(() => {
    console.log("got foo!");
    resolve();
  }, 1000);
});

// Returns a promise that resolves with "bar" in 2 seconds.
const waitForBar = () => new Promise(resolve => {
  console.log("waiting for bar...");
  setTimeout(() => {
    console.log("got bar!");
    resolve();
  }, 2000);
});

// This calls an array of tasks (each one should return a promise) in series
function doTasksInSeries(tasks) {
  co(function* () {
    for (let task of tasks) {
      yield task();
    }
    console.log("done!");
  });
}

// This runs an array of tasks in parallal
// note: co.wrap is just an alias of the above (i.e. a function that returns a coroutine)
const doTasksInParallel = co.wrap(function* (tasks) {
  yield tasks.map(task => task());
  console.log("done!");
});

// RUN -----------------

doTasksInSeries([waitForFoo, waitForBar]);
// doTasksInParallel([waitForFoo, waitForBar]);
