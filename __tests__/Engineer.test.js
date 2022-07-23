const Engineer = require("../src/lib/Engineer.js");
let engineer = new Engineer(
  "steve",
  15,
  "email@email.com",
  "Engineer",
  "Steve-Github42"
);
describe("Engineer", () => {
  it("Does Engineer have class of Engineer?", () => {
    expect(engineer.role).toMatch("Engineer");
  });

  it("Does Engineer have a github name?", () => {
    expect(engineer.github).toEqual(expect.any(String));
  });
});
