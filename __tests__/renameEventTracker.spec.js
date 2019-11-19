var EventTracker = require("../index");

describe("EventTracker", () => {
  describe("EventTracker may have its name changed", () => {
    it("it gets a new name with set", () => {
      const oldName = "test-1";
      const newName = "new test-1";
      const eventTracker = new EventTracker(oldName);
      eventTracker.name = newName;
      expect(eventTracker.name).toBe(newName);
    });
    it("but it throws an error with an invalid name", () => {
      expect(() => {
        const validName = "test-2";
        const eventTracker = new EventTracker(validName);
        eventTracker.name = null;
      }).toThrowError(Error, "Invalid name");
    });
  });
});
