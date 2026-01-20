const request = require("supertest");

jest.mock("../src/models/User.js", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  __esModule: true,
  default: {
    compare: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    sign: jest.fn(),
  },
}));

const User = require("../src/models/User.js").default;
const bcrypt = require("bcrypt").default;
const jwt = require("jsonwebtoken").default;

const express = require("express");
const authRouterModule = require("../src/routers/authRouter.js");
const authRouter = authRouterModule.default ?? authRouterModule;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("POST /auth/signin", () => {
  it("200 → login réussi", async () => {
    User.findOne.mockResolvedValue({
      id: 1,
      nameUser: "Admin1",
      email: "admin1@example.com",
      role: "admin",
      password: "hashed",
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-jwt-token");

    const res = await request(app)
      .post("/auth/signin")
      .send({
        nameUser: "Admin1",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("401 → mauvais mot de passe", async () => {
    User.findOne.mockResolvedValue({
      id: 1,
      nameUser: "admin",
      email: "admin@example.com",
      role: "admin",
      password: "hashed",
    });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post("/auth/signin")
      .send({
        nameUser: "admin",
        password: "wrong",
      });

    expect(res.statusCode).toBe(400);
  });
});
