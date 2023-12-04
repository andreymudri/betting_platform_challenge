import { BetInput } from './../protocols/types';
import { Bet, Participant } from '@prisma/client';
import * as betsRepository from "../repository/bet.repository"
import * as gameRepository from '../repository/game.repository';
import * as participantRepository from '../repository/participant.repository';



export async function createBet(bet: BetInput): Promise<Bet> {
  const checkcash = await participantRepository.getParticipantById(bet.participantId);
  if (bet.amountBet <= 0) throw new Error('Invalid bet amount');  
  if (checkcash.balance < bet.amountBet) throw new Error('Insufficient funds');  
  if (!checkcash) throw new Error("Participant not found")  
  const game = await gameRepository.getGameById(bet.gameId);
  if (!game) throw new Error('Game not found');  
  if (game.isFinished) throw new Error('Game is finished');  
  const newBalance = checkcash.balance - bet.amountBet;
  await participantRepository.updateParticipant({ id: bet.participantId, balance: newBalance });
  return await betsRepository.createBet(bet);
}

export async function updateBet(bet: Bet): Promise<Bet> {
  return await betsRepository.updateBet(bet);
}

export async function getBetsByGameId(gameId: number): Promise<Bet[]> {
  return await betsRepository.getBetsByGameId(gameId);
}

async function calculateWinnings(bet: Bet, totalWinningBetsAmount: number, totalBetsAmount: number, houseFee: number): Promise<number> {
  return (bet.amountBet / totalWinningBetsAmount) * totalBetsAmount * (1 - houseFee);
}

async function updateParticipantBalance(participantId: number, winnings: number): Promise<Participant> {
  const participant = await participantRepository.getParticipantById(participantId);
  participant.balance += winnings;
  return participantRepository.updateParticipant(participant);
}

async function updateBetStatusAndWinnings(bet: Bet, homeTeamScore: number, awayTeamScore: number, totalWinningBetsAmount: number, totalBetsAmount: number, houseFee: number): Promise<Bet> {
  if (bet.homeTeamScore === homeTeamScore && bet.awayTeamScore === awayTeamScore) {
    bet.status = 'Won';
    const winnings = await calculateWinnings(bet, totalWinningBetsAmount, totalBetsAmount, houseFee);
    bet.amountWon = winnings;
    await updateParticipantBalance(bet.participantId, winnings);
  } else {
    bet.amountWon = 0;
    bet.status = 'Lost';
  }
  return updateBet(bet);
}

export async function updateBetsByGameId(gameId: number, homeTeamScore: number, awayTeamScore: number): Promise<Bet[]> {
  const houseFee = +process.env.HOUSE_FEE || 0.3; 
  const bets = await getBetsByGameId(gameId);
  
  const totalBetsAmount = bets.reduce((total, bet) => total + bet.amountBet, 0);
  const totalWinningBetsAmount = bets.reduce((total, bet) => bet.status === 'Won' ? total + bet.amountBet : total, 0);
  if (totalWinningBetsAmount === 0) return bets; 

  const updatedBets = bets.map(bet => updateBetStatusAndWinnings(bet, homeTeamScore, awayTeamScore, totalWinningBetsAmount, totalBetsAmount, houseFee));

  return await Promise.all(updatedBets);
}

