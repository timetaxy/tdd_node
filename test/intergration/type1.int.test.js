`use strict`;
const st = require("supertest");
const app = require("../../server");
const newType = require("../data/type1data.json");

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
});
