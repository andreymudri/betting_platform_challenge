import { Participant } from '@prisma/client';
import { prisma } from '../database';
import { ParticipantInput } from '../protocols/types';

export async function createParticipant(participant: ParticipantInput) {
  return await prisma.participant.create({ data: participant });
}

export async function getParticipants() {
  return await prisma.participant.findMany();
}

export async function getParticipantById(id: number) {
  return await prisma.participant.findUnique({ where: { id } });
}

export async function updateParticipant(participant: Partial<Participant>) {
  return await prisma.participant.update({
    where: { id: participant.id }, data: {
      createdAt: participant.createdAt,
      updatedAt: participant.updatedAt,
      name: participant.name,
      balance: participant.balance,
  } });
}
export async function updateParticipantBet(id: number, balance: number) {
  return await prisma.participant.update({
    where: { id },
    data: { balance }
  });
}