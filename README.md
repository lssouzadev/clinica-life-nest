Para obter apenas os horários disponíveis para agendamento, levando em consideração as regras mencionadas, utilizando NestJS e Prisma com PostgreSQL, você pode criar uma consulta da seguinte maneira:
import { Prisma } from '@prisma/client';

const horariosDisponiveis = async () => {
  const prisma = new Prisma.Client();

  const agendamentos = await prisma.appointment.findMany({
    select: {
      date_hour: true,
    },
  });

  const horariosOcupados = agendamentos.map((agendamento) => agendamento.date_hour);

  const dataInicio = new Date();
  dataInicio.setHours(7, 0, 0); // Define o horário inicial (7:00)

  const dataFim = new Date();
  dataFim.setHours(21, 0, 0); // Define o horário final (21:00)

  const horariosDisponiveis = [];

  let horaAtual = dataInicio;

  while (horaAtual <= dataFim) {
    const horaArredondada = new Date(horaAtual);
    horaArredondada.setMinutes(0, 0); // Arredonda para a hora mais próxima

    if (!horariosOcupados.includes(horaArredondada.toISOString())) {
      horariosDisponiveis.push(horaArredondada.toISOString());
    }

    horaAtual.setMinutes(horaAtual.getMinutes() + 30); // Incrementa 30 minutos
  }

  console.log(horariosDisponiveis);

  prisma.$disconnect();
};

horariosDisponiveis();
Explicação:
	1.	Conecte-se ao banco de dados PostgreSQL usando o Prisma.
	2.	Recupere todos os valores ﻿date_hour dos agendamentos existentes no banco de dados.
	3.	Armazene os horários ocupados em um array.
	4.	Defina o horário de início e término dos horários disponíveis (7:00 às 21:00).
	5.	Itere sobre cada intervalo de 30 minutos dentro do horário de início e término.
	6.	Verifique se o horário atual não está incluído no array de horários ocupados.
	7.	Se não estiver ocupado, adicione o horário atual ao array de horários disponíveis.
	8.	Avance o horário atual em 30 minutos e repita o processo até atingir o horário de término.
	9.	Imprima o array de horários disponíveis.
	10.	Desconecte-se do banco de dados.
O array ﻿horariosDisponiveis conterá os horários disponíveis para agendamento que seguem a regra do intervalo de 30 minutos e excluem os agendamentos já marcados.