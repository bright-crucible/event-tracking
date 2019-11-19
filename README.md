[![Build Status](https://travis-ci.org/bright-crucible/event-tracking.svg?branch=master)](https://travis-ci.org/bright-crucible/event-tracking)
# event-tracking

This small library helps track the number of events that happened during a specified window (up to five minutes).

It is loaded using the `require()` function:

```
var eventTracker = require("event-tracking")
```

An event tracker can the be created to track some event:

```
const name = "Event-1";
const eventTracker = new EventTracker(name);

eventTracker.signalEvent(); // 1
eventTracker.signalEvent(); // 2
eventTracker.signalEvent(); // 3

console.log(`Recent events for ${eventTracker.name}: ${eventTracker.count()}`);
// Should print: Recent events for Event-1: 3
```

Prolonged use should be fine memory-wise as each time an event is signaled or when a count is requested, events older than the maximum time window are discarded.

# Tools

* [Atom Editor](https://atom.io/)
* [atom-easy-jsdoc](https://atom.io/packages/atom-easy-jsdoc)
* [linter-eslint](https://atom.io/packages/linter-eslint)
* [Jest](https://jestjs.io/)
* [Travis CI](https://travis-ci.org/)
* [JSDoc](https://jsdoc.app/)
