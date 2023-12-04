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