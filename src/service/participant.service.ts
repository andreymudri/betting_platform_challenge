import { Participant } from '@prisma/client';
import { ParticipantInput } from '../protocols/types';
import * as participantRepository from '../repository/participant.repository';


export async function createParticipant(participant: ParticipantInput) {

  const newParticipant = await participantRepository.createParticipant(participant);
  return newParticipant as Participant;
}

export async function getParticipants() {
  const participants = await participantRepository.getParticipants();
  return participants;
}

export async function getParticipantById(id: number) {

  const participant = await participantRepository.getParticipantById(id);
  return participant as Participant;
}