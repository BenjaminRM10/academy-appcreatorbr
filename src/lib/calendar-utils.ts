import { addDays, setHours, setMinutes, isAfter, nextDay, getDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

// Mapping days from DB/English to date-fns integers (0 = Sunday, 1 = Monday...)
const DAY_MAP: Record<string, number> = {
  'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6,
  'dom': 0, 'lun': 1, 'mar': 2, 'mie': 3, 'jue': 4, 'vie': 5, 'sab': 6
};

// CDMX Timezone
const TIMEZONE = 'America/Mexico_City';

interface Schedule {
    days: string[]; // ['mon', 'wed', 'fri']
    time: string;   // '19:00'
}

export function getNextClassDate(schedule: Schedule, startDateStr?: string): Date | null {
    if (!schedule || !schedule.days || !schedule.days.length || !schedule.time) return null;

    const now = new Date();
    // Parse start date if provided (e.g. "2026-02-16")
    const startDate = startDateStr ? new Date(startDateStr) : null;

    // Logic: If start date is in the future, we start searching FROM that date, not from NOW.
    const searchBaseDate = (startDate && isAfter(startDate, now)) ? startDate : now;

    // Parse time (e.g. "19:00") cleanly
    const timeParts = schedule.time.split(':');
    if (timeParts.length < 2) return null;
    
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    if (isNaN(hours) || isNaN(minutes)) return null;
    
    // Convert days to integers and sort them
    const targetDays = schedule.days
        .map(d => DAY_MAP[d.toLowerCase().substring(0, 3)])
        .filter(d => d !== undefined)
        .sort((a, b) => a - b);

    if (targetDays.length === 0) return null;

    // Find the next occurrence
    // We check next 14 days to be safe
    for (let i = 0; i <= 14; i++) {
        const checkDate = addDays(searchBaseDate, i);
        const currentDay = getDay(checkDate);

        if (targetDays.includes(currentDay)) {
            const classTime = setMinutes(setHours(checkDate, hours), minutes);
            
            if (isNaN(classTime.getTime())) return null;

            // If we are searching from a future start date, the first match is THE one.
            // If searching from today, we must ensure time hasn't passed.
            if (startDate && isAfter(startDate, now)) {
                 return classTime;
            } else {
                if (isAfter(classTime, now)) {
                    return classTime;
                }
            }
        }
    }

    return null;
}

export function generateGoogleCalendarUrl(event: {
    title: string;
    description: string;
    location: string;
    startDate: Date;
    durationMinutes: number;
}) {
    if (!event.startDate || isNaN(event.startDate.getTime())) return '#';

    const start = event.startDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const end = addDays(event.startDate, 0); // Just copying object
    end.setMinutes(end.getMinutes() + event.durationMinutes);
    const endStr = end.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.append("action", "TEMPLATE");
    url.searchParams.append("text", event.title);
    url.searchParams.append("details", event.description);
    url.searchParams.append("location", event.location);
    url.searchParams.append("dates", `${start}/${endStr}`);

    return url.toString();
}
