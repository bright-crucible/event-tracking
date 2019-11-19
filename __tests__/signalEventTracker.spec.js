var EventTracker = require("../index");

const msleep = async ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

describe("EventTracker", () => {
  describe("EventTracker recalls events from recent history", () => {
    it("can have a history going back five minutes", () => {
      const name = "test-1";
      const eventTracker = new EventTracker(name);
      expect(eventTracker._historyDuration).toBe(5 * 60 * 1000);
    });
    it("will throw an error if we want more history than is kept", () => {
      const name = "test-2";
      const sixMinutesInSeconds = 6 * 60;
      const eventTracker = new EventTracker(name);
      eventTracker.signalEvent();
      expect(() => {
        eventTracker.count(sixMinutesInSeconds);
      }).toThrowError(Error, "Cannot collect history older than 300 seconds");
    });
    it("can return a count of recent events", () => {
      const name = "test-3";
      const eventTracker = new EventTracker(name);
      eventTracker.signalEvent(); // 1
      eventTracker.signalEvent(); // 2
      eventTracker.signalEvent(); // 3
      expect(eventTracker.count()).toBe(3);
    });
    it("can return a large count of recent events", () => {
      const name = "test-4";
      const million = 1000000;
      const eventTracker = new EventTracker(name);
      for (let i = 0; i < million; i++) {
        eventTracker.signalEvent();
      }
      expect(eventTracker.count()).toBe(million);
    });
    it("will return event count newer than specified", async () => {
      const name = "test-5";
      const eventTracker = new EventTracker(name);
      const seconds = 1;
      eventTracker.signalEvent(); // old
      await msleep(2000);
      eventTracker.signalEvent(); // new
      expect(eventTracker.count(seconds)).toBe(1);
    });
    it("will discard old event history when using signalEvent", async () => {
      const name = "test-6";
      const eventTracker = new EventTracker(name);
      eventTracker.signalEvent();
      // special hacks - we reduce the maximum history from 5min to 2s
      // Running too long of a test in Jest is neither desirable nor easy
      // Even with this modest duration we are angering Jest
      eventTracker._historyDuration = 2000;
      await msleep(2500);
      eventTracker.signalEvent();
      eventTracker._historyDuration = 5 * 60 * 1000;
      expect(eventTracker.count()).toBe(1);
    });
  });
});
