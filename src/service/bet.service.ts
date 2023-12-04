import { BetInput } from './../protocols/types';
import { Bet, Participant } from '@prisma/client';
import * as betsRepository from "../repository/bet.repository"
import * as gameRepository from '../repository/game.repository';
import * as participantRepository from '../repository/participant.repository';



export async function createBet(bet: BetInput): Promise<Bet> {
  const user = await participantRepository.getParticipantById(bet.participantId);
  if (bet.amountBet <= 0) throw new Error('Invalid bet amount');  
  if (!user) throw new Error("Participant not found")  
  if (user.balance < bet.amountBet) throw new Error('Insufficient funds');  
  const game = await gameRepository.getGameById(bet.gameId);
  if (!game) throw new Error('Game not found');  
  if (game.isFinished) throw new Error('Game is finished');  
  const newBalance = user.balance - bet.amountBet;
  await participantRepository.updateParticipantBet(bet.participantId, newBalance);
  return await betsRepository.createBet(bet);
}

export async function updateBet(bet: Bet): Promise<Bet> {
  return await betsRepository.updateBet(bet);
}

export async function getBetsByGameId(gameId: number): Promise<Bet[]> {
  return await betsRepository.getBetsByGameId(gameId);
}

async function updateParticipantBalance(participantId: number, winnings: number): Promise<Participant> {
  const participant = await participantRepository.getParticipantById(participantId);
  if (!participant) throw new Error('Participant not found');
  participant.balance += winnings;
  return await participantRepository.updateParticipantBet(participant.id, participant.balance);
}

async function updateBetStatusAndWinnings(bet: Bet, homeTeamScore: number, awayTeamScore: number, totalBetsAmount: number, houseFee: number): Promise<Bet> {
  if (bet.homeTeamScore === homeTeamScore && bet.awayTeamScore === awayTeamScore) {
    bet.status = 'Won';
    const winnings = (bet.amountBet / totalBetsAmount) * (totalBetsAmount * (1 - houseFee))* 2;
    await updateParticipantBalance(bet.participantId, winnings);
    bet.amountWon = winnings;
  } else {
    bet.status = 'Lost';
    bet.amountWon = 0;
  }
  return await betsRepository.updateBet(bet);
}



export async function updateBetsByGameId(gameId: number, homeTeamScore: number, awayTeamScore: number): Promise<Bet[]> {
  const houseFee = +process.env.HOUSE_FEE! || 0.3; 
  let bets = await getBetsByGameId(gameId);
  const totalBetsAmount: number = bets.reduce((total, bet) => total + bet.amountBet, 0);
  const totalWinningBetsAmount = bets.reduce((total, bet) => bet.status === 'Won' ? total + bet.amountBet : total, 0);
  for (const bet of bets) {
    await updateBetStatusAndWinnings(bet, homeTeamScore, awayTeamScore, totalBetsAmount, houseFee);
  }
  return bets;
}

