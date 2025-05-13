export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { dataA, dataB, timeZoneA, timeZoneB } = req.body;

  try {
    const formatToTZ = (dateStr, tz) => {
      return new Date(new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(new Date(dateStr)));
    };

    const dataA_tz = formatToTZ(dataA, timeZoneA);
    const dataB_tz = formatToTZ(dataB, timeZoneB);

    const diffMs = dataB_tz.getTime() - dataA_tz.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    res.status(200).json({ diferenca_em_horas: diffHours });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao processar datas', detalhes: error.toString() });
  }
}
