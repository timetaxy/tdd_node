`use strict`;
const request = require("supertest");
const app = require("../../server");
const newType = require("../data/type1data.json");

it("POST /api/1", async () => {
  const response = await request(app).post("/api/1").send(newType);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newType.name);
  expect(response.body.description).toBe(newType.description);
});

it("should return 500 on POST /api/1", async () => {
  const response = await request(app).post("/api/1").send({ name: "phone" });
  expect(response.statusCode).toBe(500);
  console.log(`response body:${JSON.stringify(response.body)}`);
  expect(response.body).toStrictEqual({
    message:
      "type1 validation failed: description: Path `description` is required.",
  });
});
