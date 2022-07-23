const Intern = require("../src/lib/Intern");

const intern = new Intern("barb", 21, "mail@mail.com", "Intern", "MIT");

describe("Intern", () => {
  it("Does Intern have role of Intern?", () => {
    expect(intern.role).toMatch("Intern");
  });

  it("Does Intern have a school?", () => {
    expect(intern.role).toEqual(expect.any(String));
  });
});
