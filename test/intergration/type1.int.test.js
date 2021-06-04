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
