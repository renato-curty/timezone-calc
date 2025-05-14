const fs = require('fs');
const path = require('path');

function getAllTimezones() {
  const filePath = path.join(__dirname, '../data/timezones.json'); // Adjust the path according to your project structure
  const raw = fs.readFileSync(filePath, 'utf-8');
  const timezones = JSON.parse(raw);
  return timezones;
}

// Example usage
console.log(getAllTimezones());
