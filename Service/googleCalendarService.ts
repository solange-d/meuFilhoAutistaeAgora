const CALENDAR_ID = '779e01b3ffc9055a8574cc2d66d5d6d392f5ad8a859b66e621c9410bba109cab@group.calendar.google.com';
const API_KEY = 'AIzaSyBiSBAnTkBti2Qh3ihpSpB963su0_e690s';

export async function fetchGoogleCalendarEvents() {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.items || [];
}
