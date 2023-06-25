const supertest = require("supertest");
const { server } = require("../src/server");
const { db } = require("../src/models/index");

const request = supertest(server);
beforeAll(async () => {
  await db.sync();
});

describe("Server Routes", () => {
  describe("Version 1 routes", () => {
    it("should get all records from a model", async () => {
      const response = await request.get("/api/v1/food");
      expect(response.status).toBe(200);
    });
  });

  describe("Authentication routes", () => {
    it("should create a new user and return 201 status code", async () => {
      const user = {
        username: "testuser",
        password: "testpassword",
      };

      const response = await request.post("/signup").send(user);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("user");
      expect(response.body).toHaveProperty("token");
    });
  });
});
afterAll(async () => {
  await db.drop();
});
