// test("plus calculatioin test, 1+1=2", () => {
//   expect(1 + 1).toBe(2);
// });
const type1Controller = require("../../controller/type1");
const type1Model = require("../../models/type1");
const httpMocks = require("node-mocks-http");
const newType = require("../data/type1data.json");

type1Model.create = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});
describe(`Type1 Controller Create`, () => {
  beforeEach(() => {
    req.body = newType;
  });
  it(`should have a create product function`, () => {
    expect(typeof type1Controller.createProduct).toBe(`function`);
  });
  it(`should call type1Model.create`, () => {
    // let req = httpMocks.createRequest();
    // let res = httpMocks.createResponse();
    // let next = null;
    // req.body = newType;

    type1Controller.createProduct(req, res, next);
    expect(type1Model.create).toBeCalledWith(newType);
  });
});
