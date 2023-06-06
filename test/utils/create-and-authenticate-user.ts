import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const clinic = await prisma.clinic.create({
    data: {
      name: 'Clinic Test',
      address: 'Route one',
      phone: '1199999999',
    },
  })

  const professional = await prisma.professional.create({
    data: {
      name: 'Jane Doe',
      cpf: '00100200304',
      specialty: 'dentist',
      phone: '1199999999',
      clinic_id: clinic.id,
    },
  })
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      type: 'professional',
      professional_id: professional.id,
      patient_id: null,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    professional,
  }
}
