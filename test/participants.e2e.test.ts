import supertest from "supertest";
import httpStatus from "http-status";
import app from '../src';
import { createParticipant, createParticipantPrisma } from './factories/participant.factory';
import { cleanDb, init, close } from './helpers';

beforeAll(async () => {
  await init();
});
afterEach(async () => {
  await cleanDb();
});
afterAll(async () => {
  await close();
});

describe("GET /participants", () => {
  it("should respond with status 200 and an empty array", async () => {
    const response = await supertest(app).get("/participants");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
});

describe("POST /participants", () => {
  it("should respond with status 201 and create a new participant", async () => {
    const body = await createParticipant();
    const response = await supertest(app).post("/participants").send(body);
    expect(response.status).toBe(httpStatus.CREATED);
  });

  it("should respond with status 400 if name is not provided", async () => {
    const response = await supertest(app).post("/participants").send({});
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if name is not a string", async () => {
    const response = await supertest(app).post("/participants").send({ name: 123 });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if name is empty", async () => {
    const response = await supertest(app).post("/participants").send({ name: "" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if balance is not provided", async () => {
    const response = await supertest(app).post("/participants").send({ name: "test" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
});

describe("GET /participants/:id", () => {
  it("should respond with status 200 and the participant", async () => {
    const body = await createParticipantPrisma();
    const response = await supertest(app).get(`/participants/${body.id}`);
    expect(response.status).toBe(httpStatus.OK);
  }); 

  it("should respond with status 404 if participant does not exist", async () => {
    const response = await supertest(app).get(`/participants/0`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 400 if id is not a number", async () => {
    const response = await supertest(app).get(`/participants/a`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

});

