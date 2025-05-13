export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude e longitude são obrigatórias' });
  }

  try {
    const apiKey = process.env.TIMEZONEDB_API_KEY;

    const response = await fetch(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.message || 'Erro ao buscar timezone');
    }

    res.status(200).json({
      timeZoneId: data.zoneName, // Ex: "Europe/Paris"
      gmtOffset: data.gmtOffset,
      abbreviation: data.abbreviation
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar timezone', detalhes: error.toString() });
  }
}
