import { calcRange } from './rangeUtils.jsx';
import { toKey, addDays, fromKey } from './dateUtils.jsx';

export function buildCells(year, month, todayKey, minKey, startKey, endKey, hovKey, flex) {
    const { effStart, effEnd, rangeMin, rangeMax } = calcRange(startKey, endKey, hovKey, flex);

    const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysTotal = new Date(year, month + 1, 0).getDate();

    const cells = [];

    for (let i = 0; i < firstDow; i++) {
        const daysToPrevMonth = firstDow - i;
        const prevMonthDate = new Date(year, month, -daysToPrevMonth + 1);
        prevMonthDate.setHours(0, 0, 0, 0);
        const virtualKey = toKey(prevMonthDate);
        const isEmptyBeforeFirst = (i === firstDow - 1);
        const inRange = rangeMin !== null && virtualKey > rangeMin && virtualKey < rangeMax;
        
        cells.push({
            key: `empty-before-${year}-${month}-${i}`,
            virtualKey,
            day: null,
            disabled: true,
            isEmptyBeforeFirst,
            isEmptyAfterLast: false,
            isOtherMonth: true,
            inRange,
        });
    }

    for (let day = 1; day <= daysTotal; day++) {
        const dt = new Date(year, month, day);
        dt.setHours(0, 0, 0, 0);
        const k = toKey(dt);
        const disabled = k < minKey;
        const dow = dt.getDay();

        const isEffStart = k === effStart;
        const isEffEnd = k === effEnd;
        const inRange = rangeMin !== null && k > rangeMin && k < rangeMax;
        const isHoverEnd = !endKey && hovKey !== null && k === (flex ? toKey(addDays(fromKey(hovKey), flex)) : hovKey);
        const isDark = k === startKey || k === endKey || isEffStart || isEffEnd;

        cells.push({
            key: k,
            day,
            disabled,
            isEmptyBeforeFirst: false,
            isEmptyAfterLast: false,
            isToday: !disabled && k === todayKey,
            isEffStart,
            isEffEnd,
            inRange,
            isHoverEnd,
            isDark,
            isSunday: dow === 0,
            isMonday: dow === 1,
            isOtherMonth: false,
        });
    }

    const totalCells = 42;
    const remainingCells = totalCells - cells.length;

    for (let i = 0; i < remainingCells; i++) {
        const nextMonthDate = new Date(year, month, daysTotal + i + 1);
        nextMonthDate.setHours(0, 0, 0, 0);
        const virtualKey = toKey(nextMonthDate);
        const isEmptyAfterLast = (i === 0);
        const inRange = rangeMin !== null && virtualKey > rangeMin && virtualKey < rangeMax;
        
        cells.push({
            key: `empty-after-${year}-${month}-${i}`,
            virtualKey,
            day: null,
            disabled: true,
            isEmptyBeforeFirst: false,
            isEmptyAfterLast,
            isOtherMonth: true,
            inRange,
        });
    }

    return cells;
}