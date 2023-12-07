import supertest from "supertest";
import httpStatus from "http-status";
import app from '../src';
import { cleanDb, init, close } from './helpers';
import { createGame, createGamePrisma } from './factories/games.factory';
import { createParticipant, createParticipantPrisma } from './factories/participant.factory';
import { BetInput } from '../src/protocols/types';



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

describe("GET /Health", () => {
  it("should respond with status 200", async () => {
    const response = await supertest(app).get("/Health");
    expect(response.status).toBe(httpStatus.OK);
  });
});
describe("POST /bets", () => {
  it("should respond with status 200", async () => {
    const game = createGame();
    const participant = await createParticipantPrisma();
    const createdGame = await createGamePrisma(game);
    const score: BetInput= {
      homeTeamScore: 1,
      awayTeamScore: 2,
      amountBet: 100,
      gameId: createdGame.id,
      participantId: participant.id
    }
    const response = await supertest(app).post("/bets").send(score);
    expect(response.status).toBe(httpStatus.CREATED);
  });
  it("should fail with not enough funds", async () => {
    const game = createGame();
    const participant = await createParticipantPrisma();
    const createdGame = await createGamePrisma(game);
    const bet: BetInput= {
      homeTeamScore: 1,
      awayTeamScore: 2,
      amountBet: 10000000000,
      gameId: createdGame.id,
      participantId: participant.id
    }
    const response = await supertest(app).post("/bets").send(bet);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should fail to bet with negative value", async () => {
    const game = createGame();
    const participant = await createParticipantPrisma();
    const createdGame = await createGamePrisma(game);
    const bet: BetInput= {
      homeTeamScore: 1,
      awayTeamScore: 2,
      amountBet: -100,
      gameId: createdGame.id,
      participantId: participant.id
    }
    const response = await supertest(app).post("/bets").send(bet);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
});

describe("POST /games/:id/finish", () => {
  it("should return a game with no bets", async () => {
    const game = createGame()
    const createdGame = await createGamePrisma(game);
    const score = {
      homeTeamScore: 1,
      awayTeamScore: 2,
    }
    const response = await supertest(app).post(`/games/${createdGame.id}/finish`).send(score);
    expect(response.status).toBe(httpStatus.OK);
  });

  it("should return a game with bets", async () => {
    const game = createGame()
    const createdGame = await createGamePrisma(game);
    const participant1 = await createParticipantPrisma();
    const participant2 = await createParticipantPrisma();
    const participant3 = await createParticipantPrisma();
    const bet: BetInput = {
      homeTeamScore: 2,
      awayTeamScore: 2,
      amountBet: 1000,
      gameId: createdGame.id,
      participantId: participant1.id
    }
    await supertest(app).post("/bets").send(bet);
    const bet2: BetInput = {
      homeTeamScore: 2,
      awayTeamScore: 2,
      amountBet: 2000,
      gameId: createdGame.id,
      participantId: participant2.id
    }
    await supertest(app).post("/bets").send(bet2);
    const bet3: BetInput = {
      homeTeamScore: 3,
      awayTeamScore: 1,
      amountBet: 3000,
      gameId: createdGame.id,
      participantId: participant3.id
    }
    await supertest(app).post("/bets").send(bet3);
    const score = {
      homeTeamScore: 2,
      awayTeamScore: 2,
    }
    const response = await supertest(app).post(`/games/${createdGame.id}/finish`).send(score);
    expect(response.status).toBe(httpStatus.OK);

    const updatedGame = await supertest(app).get(`/games/${createdGame.id}`);
    expect(updatedGame.body.bets[0].amountWon).toBe(1400);
    expect(updatedGame.body.bets[1].amountWon).toBe(2800);
    expect(updatedGame.body.bets[2].amountWon).toBe(0);
  });
});