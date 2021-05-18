// test("plus calculatioin test, 1+1=2", () => {
//   expect(1 + 1).toBe(2);
// });
const type1Controller = require("../../controller/type1");
const type1Model = require("../../models/type1");
const httpMocks = require("node-mocks-http");
const newVal = require("../data/type1data.json");
const newVals = require("../data/all-type1data.json");
// const type1 = require("../../models/type1");

type1Model.create = jest.fn();
type1Model.find = jest.fn();
type1Model.findById = jest.fn();
type1Model.findByIdAndUpdate = jest.fn();
type1Model.findByIdAndDelete = jest.fn();

const typeId = "61a71517a0958bee17adc0e8";
const updatedType = { name: "updated name", description: "updated desc" };

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
    expect(typeof type1Controller.createTypes).toBe(`function`);
  });
  it(`should call type1Model.create`, async () => {
    // let req = httpMocks.createRequest();
    // let res = httpMocks.createResponse();
    // let next = null;
    // req.body = newType;

    await type1Controller.createTypes(req, res, next);
    expect(type1Model.create).toBeCalledWith(newVal);
  });
  it("should return 201 res code", async () => {
    await type1Controller.createTypes(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body res", async () => {
    type1Model.create.mockReturnValue(newVal);
    await type1Controller.createTypes(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newVal);
  });
  it(`should handle err`, async () => {
    const errMessage = { message: "descripton property missing" };
    const rejectedPromise = Promise.reject(errMessage);
    type1Model.create.mockReturnValue(rejectedPromise);
    await type1Controller.createTypes(req, res, next);
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

describe("Type Ctrt GetById", () => {
  it("data ctrl getById", () => {
    expect(typeof type1Controller.getTypesById).toBe("function");
  });
  it("shoud call typeModel.findById", async () => {
    req.params.typeId = typeId;
    await type1Controller.getTypesById(req, res, next);
    expect(type1Model.findById).toBeCalledWith(typeId);
  });

  it("shoud return json body and res code 200", async () => {
    type1Model.findById.mockReturnValue(newVal);
    await type1Controller.getTypesById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newVal);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should ret 404 when item doesnt exist", async () => {
    type1Model.findById.mockReturnValue(null);
    await type1Controller.getTypesById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle err", async () => {
    const errMsg = { message: "err" };
    const rejectedPromise = Promise.reject(errMsg);
    type1Model.findById.mockReturnValue(rejectedPromise);
    await type1Controller.getTypesById(req, res, next);
    expect(next).toHaveBeenCalledWith(errMsg);
  });
});

describe("type ctrl update", () => {
  it("shoud have an updateType function", () => {
    expect(typeof type1Controller.updateType).toBe("function");
  });
  it("should call typeModel.findByIdAndUpdate", async () => {
    req.params.typeId = typeId;
    req.body = { name: "updated name", description: "updated desc" };
    await type1Controller.updateType(req, res, next);
    expect(type1Model.findByIdAndUpdate).toHaveBeenCalledWith(
      typeId,
      { name: "updated name", description: "updated desc" },
      { new: true }
    );
  });

  it("shouldd return json body and res code 200", async () => {
    req.params.typeId = typeId;
    req.body = updatedType;
    type1Model.findByIdAndUpdate.mockReturnValue(updatedType);
    await type1Controller.updateType(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedType);
  });

  it("should handle 404 when item doesnt exist", async () => {
    type1Model.findByIdAndUpdate.mockReturnValue(null);
    await type1Controller.updateType(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy(); //mean exist return value
  });
  it("should handle err", async () => {
    const errMsg = { message: "error" };
    const rejectedPromise = Promise.reject(errMsg);
    type1Model.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await type1Controller.updateType(req, res, next);
    expect(next).toHaveBeenCalledWith(errMsg);
  });
});

describe("Type ctrl delete", () => {
  it("should have a delete type function", () => {
    expect(typeof type1Controller.deleteType).toBe("function");
  });

  it("should call type1Model.findByIdAndDelete", async () => {
    req.params.typeId = typeId;
    await type1Controller.deleteType(req, res, next);
    expect(type1Model.findByIdAndDelete).toBeCalledWith(typeId);
  });

  it("should ret 200 res", async () => {
    let deletedType = {
      name: "deleted type",
      description: "deleted",
    };
    type1Model.findByIdAndDelete.mockReturnValue(deletedType);
    await type1Controller.deleteType(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedType);
    expect(res._isEndCalled()).toBe;
  });

  it("should handle 404 when item doesnt exist", async () => {
    type1Model.findByIdAndDelete.mockReturnValue(null);
    await type1Controller.deleteType(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errMsg = { message: "Error deleting" };
    const rejectedPromise = Promise.reject(errMsg);
    type1Model.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await type1Controller.deleteType(req, res, next);
    expect(next).toHaveBeenCalledWith(errMsg);
  });
});
