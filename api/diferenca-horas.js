import { DateTime } from 'luxon';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { dataA, dataB, timeZoneA, timeZoneB } = req.body;

  try {
    const dtA = DateTime.fromISO(dataA, { zone: timeZoneA });
    const dtB = DateTime.fromISO(dataB, { zone: timeZoneB });

    const diffInHours = dtB.diff(dtA, 'hours').hours;

    res.status(200).json({ diferenca_em_horas: diffInHours });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao processar datas', detalhes: error.toString() });
  }
}
