const Manager = require("../src/lib/Manager");

const manager = new Manager("phil", 1, "phil@mail.com", "Manager", "Rear-157");

describe("Manager", () => {
  it("Does Manager have role of Manager?", () => {
    expect(manager.role).toMatch("Manager");
  });
  it("Does Manager have an office Number?", () => {
    expect(manager.officeNumber).toMatch(/^[a-zA-Z0-9-]*$/);
  });
});
