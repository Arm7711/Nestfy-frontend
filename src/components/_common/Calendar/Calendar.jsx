import { DayPicker } from 'react-day-picker';
import { useState, useEffect } from 'react';
import 'react-day-picker/dist/style.css';

const fmt = (d) =>
    d?.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });

const diffDays = (from, to) =>
    Math.round((to - from) / 86_400_000);

const getStartOfMonth = (offset = 0) => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + offset, 1);
};

export default function Calendar({ onApply }) {
    const [month, setMonth] = useState(new Date());
    const [range, setRange] = useState(undefined);
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' && window.innerWidth <= 999
    );

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 999px)');
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nights =
        range?.from && range?.to
            ? diffDays(range.from, range.to)
            : 0;

    const handleMonthChange = (nextMonth) => {
        const firstAllowedMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        if (nextMonth < firstAllowedMonth) return;

        setMonth(nextMonth);
    };

    const shared = {
        animate: !isMobile,
        mode: 'range',
        selected: range,
        onSelect: setRange,
        disabled: { before: today },
        showOutsideDays: !isMobile,
    };

    return (
        <div className="calendar-scroll-container">
            {isMobile ? (
                <DayPicker
                    {...shared}
                    numberOfMonths={14}
                    month={getStartOfMonth(0)}
                    disableNavigation
                />
            ) : (
                <div className="calendar__container">
                    <DayPicker
                        {...shared}
                        numberOfMonths={2}
                        month={month}
                        onMonthChange={handleMonthChange}
                        pagedNavigation
                        classNames={{
                            'rdp-button_previous': ({ disabled }) =>
                                disabled ? 'nav-btn-disabled' : 'nav-btn'
                        }}
                    />
                </div>
            )}
        </div>
    );
}