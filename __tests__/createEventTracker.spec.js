var EventTracker = require("../index");

describe("EventTracker", () => {
  describe("EventTracker is created when", () => {
    it("it gets a name during creation", () => {
      const eventTracker = new EventTracker("test-1");
      expect(eventTracker.name).toBe("test-1");
    });
    it("but if it doesn't then it throws an error", () => {
      expect(() => {
        new EventTracker();
      }).toThrowError(Error, "Event must have a name");
    });
  });
});
