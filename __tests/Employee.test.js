const Employee = require("../src/lib/Employee");

const employee = new Employee("Dave", 25, "email@gmail.com", "Employee");

describe("Employee", () => {
  it("Does Employee have a name?", () => {
    expect(employee.name).toEqual(expect.any(String));
  });

  it("Is the Employee name longer than 2 characters?", () => {
    expect(employee.name.length).toBeGreaterThanOrEqual(2);
  });

  it("Does Employee have an ID?", () => {
    expect(employee.id).toEqual(expect.any(Number));
  });

  it("Does Employee have an email?", () => {
    expect(employee.email).toContain("@");
    expect(employee.email).toContain(".");
  });

  it("Does Employee have a Role?", () => {
    expect(employee.role).toMatch("Employee");
  });
});
