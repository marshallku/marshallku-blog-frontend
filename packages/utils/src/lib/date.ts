export const SECOND_TO_MILLISECOND = 1000;

export const MINUTE_TO_SECOND = 60;
export const MINUTE_TO_MILLISECOND = SECOND_TO_MILLISECOND * MINUTE_TO_SECOND;

export const HOUR_TO_MINUTE = 60;
export const HOUR_TO_SECOND = HOUR_TO_MINUTE * MINUTE_TO_SECOND;
export const HOUR_TO_MILLISECOND = HOUR_TO_SECOND * SECOND_TO_MILLISECOND;

export const DAY_TO_HOUR = 24;
export const DAY_TO_SECOND = DAY_TO_HOUR * HOUR_TO_SECOND;
export const DAY_TO_MILLISECOND = DAY_TO_SECOND * SECOND_TO_MILLISECOND;

export const WEEK_TO_DAY = 7;
export const WEEK_TO_SECOND = WEEK_TO_DAY * DAY_TO_SECOND;
export const WEEK_TO_MILLISECOND = WEEK_TO_SECOND * SECOND_TO_MILLISECOND;

export const MONTH_TO_DAY = 30;
export const MONTH_TO_SECOND = MONTH_TO_DAY * DAY_TO_SECOND;
export const MONTH_TO_MILLISECOND = MONTH_TO_SECOND * SECOND_TO_MILLISECOND;

export const YEAR_TO_MONTH = 12;
export const YEAR_TO_DAY = 365;
export const YEAR_TO_SECOND = YEAR_TO_DAY * DAY_TO_SECOND;
export const YEAR_TO_MILLISECOND = YEAR_TO_SECOND * SECOND_TO_MILLISECOND;

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
