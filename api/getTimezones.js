import fs from 'fs';
import path from 'path';

function getAllTimezones() {
  const filePath = path.join(process.cwd(), 'data/timezones.json'); // usando process.cwd() para o diretório correto
  const raw = fs.readFileSync(filePath, 'utf-8');
  const timezones = JSON.parse(raw);
  return timezones;
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const timezones = getAllTimezones();
    res.status(200).json(timezones);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
