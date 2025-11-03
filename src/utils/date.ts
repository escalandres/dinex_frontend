// utils/date.ts

export function formatDateISO(date: Date): string {
    return date.toISOString().split('.')[0] + 'Z';
}

export function convertUTCToLocal(utcString: string, timeZone: string, language: string, country: string): string {
    const utcDate = new Date(utcString);
    return utcDate.toLocaleString(`${language}-${country}`, {
        timeZone: timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

export function getMonthBoundaries(): { start: Date; end: Date } {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return { start, end };
}

export function isDateInCurrentMonth(date: Date): boolean {
    const { start, end } = getMonthBoundaries();
    return date >= start && date <= end;
}

export function differenceInDays(dateA: Date, dateB: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utcA = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
    const utcB = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
    return Math.floor((utcA - utcB) / msPerDay);
}

export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function getNextOccurrence(start: Date, frequencyDays: number): Date | null {
    const { start: startOfMonth } = getMonthBoundaries();

    if (start > startOfMonth) {
        // El ingreso aún no ha comenzado este mes
        return start;
    }

    const daysDiff = differenceInDays(startOfMonth, start);
    const cycles = Math.floor(daysDiff / frequencyDays);
    const next = addDays(start, cycles * frequencyDays);

    return next >= start ? next : null;
}


export function isInCurrentMonth(applicationDate: string, frequencyDays: number): boolean {
    const start = new Date(applicationDate);
    if (isNaN(start.getTime())) return false;

    if (frequencyDays === 0) {
        return isDateInCurrentMonth(start);
    }

    const next = getNextOccurrence(start, frequencyDays);
    return isDateInCurrentMonth(next);
}

export function hasOccurrenceInMonth(start: Date, frequencyDays: number): boolean {
    const { start: monthStart, end: monthEnd } = getMonthBoundaries();
    if (start > monthEnd) return false;

    let current = new Date(start);
    while (current <= monthEnd) {
        if (current >= monthStart) return true;
        current = addDays(current, frequencyDays);
    }

    return false;
}