// test("plus calculatioin test, 1+1=2", () => {
//   expect(1 + 1).toBe(2);
// });
const type1Controller = require("../../controller/type1");
const type1Model = require("../../models/type1");
type1Model.create = jest.fn();

describe(`Type1 Controller Create`, () => {
  it(`should have a create product function`, () => {
    expect(typeof type1Controller.createProduct).toBe(`function`);
  });
  it(`should call type1Model.create`, () => {
    type1Controller.createProduct();
    expect(type1Model.create).toBeCalled();
  });
});
