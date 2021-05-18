`use strict`;
const st = require("supertest");
const { request } = require("../../server");
const app = require("../../server");
const newType = require("../data/type1data.json");
let firstType;

it("POST /api/1", async () => {
  const response = await st(app).post("/api/1").send(newType);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newType.name);
  expect(response.body.description).toBe(newType.description);
});

it("should return 500 on POST /api/1", async () => {
  const response = await st(app).post("/api/1").send({ name: "phone" });
  expect(response.statusCode).toBe(500);
  console.log(`response body:${JSON.stringify(response.body)}`);
  expect(response.body).toStrictEqual({
    message:
      "type1 validation failed: description: Path `description` is required.",
  });
});

it("GET /api/a1/types", async () => {
  const response = await st(app).get("/api/1");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstType = response.body[0];
});

it("GET /api/a1/types/:typeId", async () => {
  const res = await st(app).get("/api/1/" + firstType._id);
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe(firstType.name);
  expect(res.body.description).toBe(firstType.description);
});

it("GET id doesnt exist /api/a1/types/:typeId", async () => {
  const res = await st(app).get("/api/types/61a71517a0958bee17adc011");
  expect(res.statusCode).toBe(404);
});

it("PUT /api/a1/types", async () => {
  const res = await st(app)
    .put("api/types/" + firstType._id)
    .send({ name: "updated name", description: "updated desc" });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("updated name");
  expect(res.body.description).toBe("updated desc");
});

it("should ret 404 on PUT /api/types", async () => {
  const res = await st(app)
    .put("api/types" + "")
    .send({ name: "updated name", description: "updated desc" });
  expect(res.statusCode).toBe(404);
});

it("DELETE /api/types", async () => {
  const res = await st(app)
    .delete("/api/types", +firstType._id)
    .send();
  expect(res.statusCode).toBe(200);
});

it("DELETE id doesnt exist /api/types/:typeId", async () => {
  const res = await request(app)
    .delete("/api/types" + firstType._id)
    .send();
  expect(res.statusCode).toBe(404);
});
