import fs from 'fs';
import path from 'path';

function getAllTimezones() {
  const filePath = path.join(process.cwd(), 'data/timezones.json'); // Acessa a pasta correta usando process.cwd()
  const raw = fs.readFileSync(filePath, 'utf-8');
  const timezones = JSON.parse(raw);
  return timezones;
}

// Handler para as requisições GET
export default function handler(req, res) {
  if (req.method === 'GET') {
    const timezones = getAllTimezones();
    res.status(200).json(timezones); // Retorna a lista de timezones
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); // Retorna erro para métodos que não sejam GET
  }
}
