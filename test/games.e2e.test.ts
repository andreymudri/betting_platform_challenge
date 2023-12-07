import supertest from "supertest";
import httpStatus from "http-status";
import app from '../src';
import { cleanDb, init, close } from './helpers';
import { createGame, createGamePrisma } from './factories/games.factory';
import { GameEndInput } from '../src/protocols/types';

beforeAll(async () => {
  await init();
  await cleanDb();
});
afterEach(async () => {
  await cleanDb();
});
afterAll(async () => {
  await close();
});

describe("GET /games", () => {
  it("should respond with status 200 and an empty array", async () => {
    const response = await supertest(app).get("/games");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
  it("should respond with status 200 and an array of games", async () => {
    const game = createGame();
    await createGamePrisma(game);
    const response = await supertest(app).get("/games");
    expect(response.status).toBe(httpStatus.OK);
  });

});

describe("POST /games", () => {
  it("should respond with status 201 and create a new game", async () => {
    const body = createGame();
    const response = await supertest(app).post("/games").send(body);
    expect(response.status).toBe(httpStatus.CREATED);
  });

  it("should respond with status 400 if name is not provided", async () => {
    const response = await supertest(app).post("/games").send({});
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if name is not a string", async () => {
    const response = await supertest(app).post("/games").send({ name: 123 });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if name is empty", async () => {
    const response = await supertest(app).post("/games").send({ name: "" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if awayTeamName is not provided", async () => {
    const response = await supertest(app).post("/games").send({ homeTeamName: "test" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 if homeTeamName is not provided", async () => {
    const response = await supertest(app).post("/games").send({ awayTeamName: "test" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should fail with status 400 if awayTeamName is not a string", async () => {
    const response = await supertest(app).post("/games").send({ homeTeamName: "test", awayTeamName: 123 });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should fail with status 400 if homeTeamName is not a string", async () => {
    const response = await supertest(app).post("/games").send({ homeTeamName: 123, awayTeamName: "test" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should fail with status 400 if homeTeamName is empty", async () => {
    const response = await supertest(app).post("/games").send({ homeTeamName: "", awayTeamName: "test" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should fail with status 400 if awayTeamName is empty", async () => {
    const response = await supertest(app).post("/games").send({ homeTeamName: "test", awayTeamName: "" });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should fail to find a game", async () => { 
    const id = 0;
    const response = await supertest(app).get(`/games/${id}`);
    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  })
  it("should fail to complete a game", async () => {
    const game =  createGame();
    const createdGame = await createGamePrisma(game);
    const score: GameEndInput = {
      awayTeamScore:1,
      homeTeamScore: 2,
    }
    const response = await supertest(app).post(`/games/${createdGame.id}/finish`).send(score);
    expect(response.status).toEqual(httpStatus.OK);
  })
  it("should complete a game", async () => {
    const game =  createGame();
    const createdGame = await createGamePrisma(game);
    const score: GameEndInput = {
      awayTeamScore:1,
      homeTeamScore: 2,
    }
    const response = await supertest(app).post(`/games/${createdGame.id}/finish`).send(score);
    expect(response.status).toEqual(httpStatus.OK);
  })
  it("should fail to create a game with invalid data", async () => {
    const response = await supertest(app).post("/games").send({});
    expect(response.status).toEqual(httpStatus.BAD_REQUEST);
  })
  it("should fail to finish a game that doesnt exist", async () => {
    const score: GameEndInput = {
      awayTeamScore:1,
      homeTeamScore: 2,
    }
    const response = await supertest(app).post(`/games/0/finish`).send(score);
    expect(response.status).toEqual(httpStatus.NOT_FOUND);
  })

});

describe("GET /games/:id", () => {
  it("should respond with status 200 and the game", async () => {
    const game =  createGame();
    const createdGame = await createGamePrisma(game);
    const response = await supertest(app).get(`/games/${createdGame.id}`);
    expect(response.status).toBe(httpStatus.OK);
  }); 

  it("should respond with status 404 if game does not exist", async () => {
    const response = await supertest(app).get(`/games/0`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 400 if id is not a number", async () => {
    const response = await supertest(app).get(`/games/a`);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
});