import { DateTime } from 'luxon';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { dataA, dataB, timeZoneA, timeZoneB } = req.body;

  try {
    const format = 'LLL dd, yyyy h:mm a'; // Ex: "May 12, 2025 2:42 pm"

    const dtA = DateTime.fromFormat(dataA, format, { zone: timeZoneA });
    const dtB = DateTime.fromFormat(dataB, format, { zone: timeZoneB });

    if (!dtA.isValid || !dtB.isValid) {
      throw new Error('Formato de data inválido. Use "May 12, 2025 2:42 pm"');
    }

    const diffInMinutes = dtB.diff(dtA, 'minutes').minutes;
    const diffInHours = diffInMinutes / 60;

    const horas = Math.floor(diffInHours);
    const minutos = Math.round((diffInHours - horas) * 60);

    res.status(200).json({
      duracao_total_em_horas: parseFloat(diffInHours.toFixed(3)), // ex: 7.333
      horas,
      minutos
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao processar datas', detalhes: error.toString() });
  }
}
