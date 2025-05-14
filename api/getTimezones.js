// api/getTimezones.js
const fs = require('fs');
const path = require('path');

// Função para ler o arquivo de timezones e retornar como JSON
function getAllTimezones() {
  const filePath = path.join(__dirname, '../data/timezones.json'); // Caminho para o arquivo JSON
  const raw = fs.readFileSync(filePath, 'utf-8');
  const timezones = JSON.parse(raw);
  return timezones;
}

// Exportando a função para ser usada pelo Vercel
module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const timezones = getAllTimezones(); // Obtém os timezones
      res.status(200).json(timezones); // Envia os timezones como resposta JSON
    } catch (error) {
      res.status(500).json({ message: 'Error reading timezones data', error: error.message });
    }
  } else {
    // Se a requisição não for GET, retorna método não permitido
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
