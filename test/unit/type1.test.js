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
  next = jest.fn();
});
describe(`Type1 Controller Create`, () => {
  beforeEach(() => {
    req.body = newType;
  });
  it(`should have a create product function`, () => {
    expect(typeof type1Controller.createProduct).toBe(`function`);
  });
  it(`should call type1Model.create`, async () => {
    // let req = httpMocks.createRequest();
    // let res = httpMocks.createResponse();
    // let next = null;
    // req.body = newType;

    await type1Controller.createProduct(req, res, next);
    expect(type1Model.create).toBeCalledWith(newType);
  });
  it("should return 201 res code", async () => {
    await type1Controller.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body res", async () => {
    type1Model.create.mockReturnValue(newType);
    await type1Controller.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newType);
  });
  it(`should handle err`, async () => {
    const errMessage = { message: "descripton property missing" };
    const rejectedPromise = Promise.reject(errMessage);
    type1Model.create.mockReturnValue(rejectedPromise);
    await type1Controller.createProduct(req, res, next);
    expect(next).toBeCalledWith(errMessage);
  });
});
