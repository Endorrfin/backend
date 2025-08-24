

// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();


function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending OS tasks? (Like server listening to port)
  // Check three: Any pending long running operation? (Like fs module)

  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;

}

// Entire body executes in one 'tick'
while (shouldContinue()) {

  // I. Node looks an pendingTimers and sees if any functions are ready to be called
  // II. Node looks an pendingOSTasks and pendingOperations and calls relevant callbacks
  // III. Pause execution. Continue when...
        // - a new pendingOSTasks is done
        // - a new pendingOperation is done
        // - a timer is about to complete

  // IV. Look at pendingTimers. Call any setImmediate
  // V. Handle any 'close' events

}







// exit back to terminal






