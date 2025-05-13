import { DateTime } from 'luxon';
import NodeGeocoder from 'node-geocoder';

const geocoder = NodeGeocoder({
  provider: 'openstreetmap'
});

export default async function handler(request, response) {
  try {
    const { dataA, dataB, latA, longA, latB, longB } = request.body;

    if (!dataA || !dataB || !latA || !longA || !latB || !longB) {
      return response.status(400).json({ error: 'Missing parameters' });
    }

    // Obtem os timezones a partir das coordenadas
    const [resA] = await geocoder.reverse({ lat: latA, lon: longA });
    const [resB] = await geocoder.reverse({ lat: latB, lon: longB });

    const timeZoneA = resA?.extra?.timezone;
    const timeZoneB = resB?.extra?.timezone;

    if (!timeZoneA || !timeZoneB) {
      return response.status(500).json({ error: 'Could not determine timezone from coordinates' });
    }

    // Converte as datas para os respectivos timezones
    const dtA = DateTime.fromISO(dataA, { zone: timeZoneA });
    const dtB = DateTime.fromISO(dataB, { zone: timeZoneB });

    // Calcula a diferença em horas
    const diferenca = dtB.diff(dtA, 'hours').hours;

    return response.status(200).json({ diferenca_em_horas: diferenca });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Erro interno no servidor' });
  }
}
