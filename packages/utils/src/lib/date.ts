export const SECOND_TO_MILLISECOND: number = 1000;

export const MINUTE_TO_SECOND: number = 60;
export const MINUTE_TO_MILLISECOND: number = SECOND_TO_MILLISECOND * MINUTE_TO_SECOND;

export const HOUR_TO_MINUTE: number = 60;
export const HOUR_TO_SECOND: number = HOUR_TO_MINUTE * MINUTE_TO_SECOND;
export const HOUR_TO_MILLISECOND: number = HOUR_TO_SECOND * SECOND_TO_MILLISECOND;

export const DAY_TO_HOUR: number = 24;
export const DAY_TO_SECOND: number = DAY_TO_HOUR * HOUR_TO_SECOND;
export const DAY_TO_MILLISECOND: number = DAY_TO_SECOND * SECOND_TO_MILLISECOND;

export const WEEK_TO_DAY: number = 7;
export const WEEK_TO_SECOND: number = WEEK_TO_DAY * DAY_TO_SECOND;
export const WEEK_TO_MILLISECOND: number = WEEK_TO_SECOND * SECOND_TO_MILLISECOND;

export const MONTH_TO_DAY: number = 30;
export const MONTH_TO_SECOND: number = MONTH_TO_DAY * DAY_TO_SECOND;
export const MONTH_TO_MILLISECOND: number = MONTH_TO_SECOND * SECOND_TO_MILLISECOND;

export const YEAR_TO_MONTH: number = 12;
export const YEAR_TO_DAY: number = 365;
export const YEAR_TO_SECOND: number = YEAR_TO_DAY * DAY_TO_SECOND;
export const YEAR_TO_MILLISECOND: number = YEAR_TO_SECOND * SECOND_TO_MILLISECOND;

const pad = (n: number): string => `${n}`.padStart(2, "0");

export function formatDate(date: Date, format: string): string {
    return format
        .replace(/yyyy/g, date.getFullYear().toString())
        .replace(/MM/g, pad(date.getMonth() + 1))
        .replace(/dd/g, pad(date.getDate()))
        .replace(/HH/g, pad(date.getHours()))
        .replace(/mm/g, pad(date.getMinutes()))
        .replace(/ss/g, pad(date.getSeconds()));
}

export function humanizeDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 0) {
        return formatDate(date, "yyyy. MM. dd");
    }

    if (diff < 3 * MINUTE_TO_MILLISECOND) {
        return "방금 전";
    }

    if (diff < HOUR_TO_MILLISECOND) {
        return `${Math.floor(diff / MINUTE_TO_MILLISECOND)}분 전`;
    }

    if (diff < DAY_TO_MILLISECOND) {
        return `${Math.floor(diff / HOUR_TO_MILLISECOND)}시간 전`;
    }

    if (diff < WEEK_TO_MILLISECOND) {
        return `${Math.floor(diff / DAY_TO_MILLISECOND)}일 전`;
    }

    if (diff < 3 * MONTH_TO_MILLISECOND) {
        return `${Math.floor(diff / WEEK_TO_MILLISECOND)}주 전`;
    }

    if (diff < YEAR_TO_MILLISECOND) {
        return `${Math.floor(diff / MONTH_TO_MILLISECOND)}달 전`;
    }

    return `${Math.floor(diff / YEAR_TO_MILLISECOND)}년 전`;
}
