import { DayPicker } from 'react-day-picker';
import { useState, useEffect } from 'react';
import 'react-day-picker/dist/style.css';

const fmt = (d) =>
    d?.toLocaleDateString('hy-AM', { day: 'numeric', month: 'short' });

const getStartOfMonth = (offset = 0) => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + offset, 1);
};

const normalize = (d) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date;
};

const getSelectedDates = (from, to) => {
    const result = [];
    
    if (from) {
        result.push(new Date(normalize(from)));
    }
    
    if (to && (!from || to.getTime() !== from.getTime())) {
        result.push(new Date(normalize(to)));
    }
    
    return result;
};

const mapDate = (date) => {
    const d = new Date(date);
    return {
        date: d,
        iso: d.toISOString(),
        timestamp: d.getTime(),
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        dayOfWeek: d.getDay(),
        dayName: d.toLocaleDateString('hy-AM', { weekday: 'long' }),
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
    };
};

const buildSelectedDatesData = (from, to) => {
    if (!from && !to) return [];
    return getSelectedDates(from, to).map(mapDate);
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

    const today = normalize(new Date());

    const handleMonthChange = (nextMonth) => {
        const firstAllowedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        if (nextMonth < firstAllowedMonth) return;
        setMonth(nextMonth);
    };

    const handleSelect = (r) => {
        if (!r) {
            setRange(undefined);
            if (onApply) onApply([]);
            return;
        }
        
        const newRange = {
            from: r.from ? normalize(r.from) : undefined,
            to: r.to ? normalize(r.to) : undefined,
        };
        
        setRange(newRange);
        
        const selectedDatesData = buildSelectedDatesData(newRange.from, newRange.to);
        if (onApply) onApply(selectedDatesData);
    };

    const selectedDatesData = buildSelectedDatesData(range?.from, range?.to);

    console.log('Selected month:', month);
    console.log('Range object:', range);
    console.log('Selected dates data (only from and to):', selectedDatesData);

    return (
        <div className="calendar-scroll-container">
            {isMobile ? (
                <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={handleSelect}
                    disabled={{ before: today }}
                    numberOfMonths={14}
                    month={getStartOfMonth(0)}
                    disableNavigation
                    showOutsideDays={!isMobile}
                />
            ) : (
                <div className="calendar__container">
                    <DayPicker
                        mode="range"
                        selected={range}
                        onSelect={handleSelect}
                        disabled={{ before: today }}
                        numberOfMonths={2}
                        month={month}
                        onMonthChange={handleMonthChange}
                        pagedNavigation
                        showOutsideDays={!isMobile}
                        classNames={{
                            rdp_button_previous: ({ disabled }) =>
                                disabled ? 'nav-btn-disabled' : 'nav-btn',
                        }}
                    />
                </div>
            )}
        </div>
    );
}