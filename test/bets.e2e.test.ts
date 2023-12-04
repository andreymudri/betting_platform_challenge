import supertest from "supertest";
import httpStatus from "http-status";
import app from '../src';
import { cleanDb, init, close } from './helpers';
import { createGame, createGamePrisma } from './factories/games.factory';
import { create } from 'domain';


beforeAll(async () => {
  await init();
});
afterEach(async () => {
  await cleanDb();
});
afterAll(async () => {
  await close();
});


describe("POST /bets", () => {
  it("should respond with status 200 and an empty array", async () => {
    const response = await supertest(app).post("/bets");
    expect(response.status).toBe(httpStatus.CREATED);
  });
});

describe("POST /games/:id/finish", () => {
  it("should return a game with no bets", async () => {
    const game = createGame()
    const createdGame = await createGamePrisma(game);
    const response = await supertest(app).post(`/games/${createdGame.id}/finish`);
    expect(response.status).toBe(httpStatus.OK);
  });
});