// test("plus calculatioin test, 1+1=2", () => {
//   expect(1 + 1).toBe(2);
// });
const type1Controller = require("../../controller/type1");
const type1Model = require("../../models/type1");
const httpMocks = require("node-mocks-http");
const newVal = require("../data/type1data.json");
const newVals = require("../data/all-type1data.json");

type1Model.create = jest.fn();
type1Model.find = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});
describe(`Type1 Controller Create`, () => {
  beforeEach(() => {
    req.body = newVal;
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
    expect(type1Model.create).toBeCalledWith(newVal);
  });
  it("should return 201 res code", async () => {
    await type1Controller.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body res", async () => {
    type1Model.create.mockReturnValue(newVal);
    await type1Controller.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newVal);
  });
  it(`should handle err`, async () => {
    const errMessage = { message: "descripton property missing" };
    const rejectedPromise = Promise.reject(errMessage);
    type1Model.create.mockReturnValue(rejectedPromise);
    await type1Controller.createProduct(req, res, next);
    expect(next).toBeCalledWith(errMessage);
  });
});

describe("type controller Get", () => {
  it("should have a getTypes func", () => {
    expect(typeof type1Controller.getTypes).toBe("function");
  });
  it("should call typeMode.find({})", async () => {
    //.find({}): meaning of all value
    await type1Controller.getTypes(req, res, next);
    expect(type1Model.find).toHaveBeenCalledWith({});
  });
  it("should ret 200 res", async () => {
    await type1Controller.getTypes(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy(); //it mean ret something
  });
  it("shoud ret json body in res", async () => {
    type1Model.find.mockReturnValue(newVals);
    await type1Controller.getTypes(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newVals);
  });
  it("shoud handle err", async () => {
    const errMsg = { message: "Error finding data" };
    const rejectedPromise = Promise.reject(errMsg);
    //reject( reson )
    type1Model.find.mockReturnValue(rejectedPromise);
    await type1Controller.getTypes(req, res, next);
    expect(next).toHaveBeenCalledWith(errMsg);
  });
});
