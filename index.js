"use strict";

/** Class representing an event tracker. */
class EventTracker {
  /**
   * constructor - Creates an EventTracker instance.
   *
   * @param  {string} name - Meaningful name to describe the EventTracker.
   */
  constructor(name) {
    if (!name) throw new Error("Event must have a name");
    this._name = name;
    this._events = [];
    this._lastFlush = Date.now();
    this._historyDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
  }

  /**
   * set name - Sets or changes the name of the EventTracker.
   *
   * @param  {string} name - The new name for this EventTracker.
   * @return {string} - The new name for this EventTracker.
   */
  set name(name) {
    if (!name) throw new Error("Invalid name");
    this._name = name;
    return this._name;
  }

  /**
   * get name - Gets the name of the EventTracker.
   *
   * @return {string} - The current name for this EventTracker.
   */
  get name() {
    return this._name;
  }

  /**
   * signalEvent - Signals that an event has occurred.
   * Will remove old events when called.
   *
   */
  signalEvent() {
    const now = Date.now();
    this._events.push(now);
    this.oldFlush();
  }

  /**
   * oldFlush - Gets rid of events older than this._historyDuration.
   * It's use is not recommended unless there is a concern over memory use.
   */
  oldFlush() {
    const now = Date.now();
    const dawnOfTime = now - this._historyDuration;
    if (this._lastFlush < dawnOfTime) {
      this._events = this._events.filter(eventAge => eventAge > dawnOfTime);
      this._lastFlush = now;
    }
  }

  /**
   * count - Returns the count of events signaled within the last number of
   * the parameter seconds time.
   *
   * @param  {int} seconds - (optional) Interval of event history to count.
   * Defaults to five minutes (300 seconds).
   * @return {int} - How many events were counted during the given interval.
   */
  count(seconds = 300) {
    const now = Date.now();
    const ms = seconds * 1000;
    const queryAge = now - ms;
    if (ms > this._historyDuration)
      throw new Error(
        `Cannot collect history older than ${Math.round(
          this._historyDuration / 1000
        )} seconds`
      );
    const neoEvents = this._events.filter(eventAge => eventAge > queryAge);
    this.oldFlush();
    return neoEvents.length;
  }
}

module.exports = EventTracker;
