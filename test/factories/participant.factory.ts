import { faker } from '@faker-js/faker';
import { ParticipantInput } from './../../src/protocols/types';
import { prisma } from '../helpers';
export async function createParticipant(): Promise<ParticipantInput> {
  const participant = {
    name: faker.lorem.word(),
     balance: faker.number.int({ min: 1000, max: 100000 }) 
  }  
  
  return participant
}

export async function createParticipantPrisma() {
  const participant = await prisma.participant.create({
    data: {
      name: faker.lorem.word(),
      balance: faker.number.int({ min: 1000, max: 100000 }) 
    }
  })
  return participant;
}