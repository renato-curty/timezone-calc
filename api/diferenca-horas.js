import { DateTime } from 'luxon';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { start_date, end_date, timeZoneA, timeZoneB } = req.body;

  try {
    const format = 'LLL dd, yyyy h:mm a'; // e.g., "May 12, 2025 2:42 pm"

    const dtA = DateTime.fromFormat(start_date, format, { zone: timeZoneA });
    const dtB = DateTime.fromFormat(end_date, format, { zone: timeZoneB });

    if (!dtA.isValid || !dtB.isValid) {
      throw new Error('Invalid date format. Use "May 12, 2025 2:42 pm"');
    }

    const diffInMinutes = dtB.diff(dtA, 'minutes').minutes;
    const diffInHours = diffInMinutes / 60;

    const hours_portion_only = Math.floor(diffInHours);
    const minutes = Math.round((diffInHours - hours_portion_only) * 60);
    const minutes_portion_only = minutes.toString().padStart(2, '0');

    res.status(200).json({
      global_gap_hours: parseFloat(diffInHours.toFixed(3)),
      hours_portion_only,
      minutes_portion_only
    });
  } catch (error) {
    res.status(400).json({ error: 'Error processing dates', details: error.toString() });
  }
}
