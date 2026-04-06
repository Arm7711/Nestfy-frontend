import { useState, useCallback, useEffect, useRef } from 'react';
import { MonthColumn } from './components/index.jsx';
import { useChipWidths } from './hooks/index.jsx';
import { FLEX_OPTS } from './constants.jsx';
import { toKey, fromKey, fmtKey } from './utils/index.jsx';

import CurretV1CalendarSvg from '../../svg/CurretV1CalendarSvg.jsx';

function nightsWordEnglish(n) {
    return n === 1 ? 'night' : 'nights';
}

export default function V1Calendar({ onChange, minDate, className = '' }) {
    const todayRef = useRef((() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })());
    const todayKey = toKey(todayRef.current);

    const twoYearsAgo = new Date(todayRef.current);
    twoYearsAgo.setFullYear(todayRef.current.getFullYear());
    const defaultMinKey = toKey(twoYearsAgo);

    const minKey = minDate
        ? Math.max(toKey(new Date(minDate)), defaultMinKey)
        : defaultMinKey;

    const twoYearsLater = new Date(todayRef.current);
    twoYearsLater.setFullYear(todayRef.current.getFullYear() + 2);
    const maxKey = toKey(twoYearsLater);

    const [startKey, setStartKey] = useState(null);
    const [endKey, setEndKey] = useState(null);
    const [hovKey, setHovKey] = useState(null);
    const [flex, setFlex] = useState(0);

    const [baseYear, setBaseYear] = useState(todayRef.current.getFullYear());
    const [baseMonth, setBaseMonth] = useState(todayRef.current.getMonth());
    const [animPhase, setAnimPhase] = useState('idle');
    const [animDir, setAnimDir] = useState(0);
    const [animKey, setAnimKey] = useState(0);
    const [prevYear, setPrevYear] = useState(null);
    const [prevMonth, setPrevMonth] = useState(null);

    const chipMinWidths = useChipWidths();

    const navigate = useCallback((dir) => {
        if (animPhase === 'running') return;

        let newYear = baseYear;
        let newMonth = baseMonth + dir;
        if (newMonth > 11) { newYear++; newMonth = 0; }
        if (newMonth < 0) { newYear--; newMonth = 11; }

        // Запрещаем навигацию назад более чем на 2 года
        const twoYearsAgoDate = new Date(todayRef.current);
        twoYearsAgoDate.setFullYear(todayRef.current.getFullYear() - 2);
        const newDate = new Date(newYear, newMonth, 1);

        if (dir < 0 && newDate < twoYearsAgoDate) {
            return;
        }

        setPrevYear(baseYear);
        setPrevMonth(baseMonth);
        setAnimDir(dir);
        setAnimKey(k => k + 1);
        setBaseMonth(m => {
            const nm = m + dir;
            if (nm > 11) { setBaseYear(y => y + 1); return 0; }
            if (nm < 0) { setBaseYear(y => y - 1); return 11; }
            return nm;
        });
        setAnimPhase('running');
        setTimeout(() => setAnimPhase('idle'), 380);
    }, [animPhase, baseYear, baseMonth]);

    const handleReset = useCallback(() => {
        setStartKey(null); setEndKey(null); setHovKey(null); setFlex(0);
    }, []);

    const handleDayClick = useCallback((k) => {
        if (k < minKey) return;

        if (k > maxKey) return;

        if (k === startKey && !endKey) {
            handleReset();
            return;
        }

        if (k === endKey) {
            setEndKey(null);
            setHovKey(null);
            return;
        }

        if (!startKey || endKey) {
            setStartKey(k); setEndKey(null); setHovKey(null);
        } else {
            if (k <= startKey) {
                setStartKey(k); setEndKey(null); setHovKey(null);
            } else {
                setEndKey(k);
            }
        }
    }, [startKey, endKey, minKey, maxKey, handleReset]);

    const handleTodayChip = useCallback(() => {
        if (startKey === todayKey && !endKey) {
            handleReset();
        } else {
            setStartKey(todayKey);
            setEndKey(null);
            setHovKey(null);
            setFlex(0);
        }
    }, [startKey, endKey, todayKey, handleReset]);

    const handleFlexChip = useCallback((value) => {
        setFlex(prev => prev === value ? 0 : value);
    }, []);

    useEffect(() => { onChange?.({ startKey, endKey, flex }); }, [startKey, endKey, flex, onChange]);

    const status = (() => {
        if (!startKey) return 'Select check-in date';
        if (!endKey) return `Check-in: ${fmtKey(startKey)}${flex ? ` (±${flex} day${flex > 1 ? 's' : ''})` : ''}\u00a0—\u00a0select check-out`;
        const n = Math.round((fromKey(endKey) - fromKey(startKey)) / 86400000);
        return `${fmtKey(startKey)} - ${fmtKey(endKey)} · ${n}\u00a0${nightsWordEnglish(n)}${flex ? ` · ±${flex}\u00a0day${flex > 1 ? 's' : ''}` : ''}`;
    })();

    const colProps = {
        baseYear, baseMonth,
        animPhase, animDir, animKey,
        prevYear, prevMonth,
        startKey, endKey, hovKey, flex, todayKey, minKey,
        onEnter: setHovKey,
        onLeave: () => setHovKey(null),
        onClick: handleDayClick,
    };

    return (
        <div className={`v1cal ${className}`}>
            <div className="v1cal__body">
                <button className="v1cal__nav" onClick={() => navigate(-1)} aria-label="Previous">
                    <CurretV1CalendarSvg />
                </button>
                <div className="v1cal__months">
                    <MonthColumn colOffset={0} {...colProps} />
                    <MonthColumn colOffset={1} {...colProps} />
                </div>
                <button className="v1cal__nav" onClick={() => navigate(1)} aria-label="Next">
                    <CurretV1CalendarSvg className='icon next'/>
                </button>
            </div>

            <div className="v1cal__footer">
                <div className="v1cal__status-wrap">
                    <span className="v1cal__status v1cal__status--phantom" aria-hidden="true">
                        Check-in: Sep 30 (±14 days) - select check-out
                    </span>
                    <span className="v1cal__status">{status}</span>
                    <span className="v1cal__clear-placeholder">
                        {startKey
                            ? <button className="v1cal__clear" onClick={handleReset}>Clear dates</button>
                            : <span className="v1cal__clear v1cal__clear--hidden" aria-hidden="true">Clear dates</span>
                        }
                    </span>
                </div>

                <div className="v1cal__chips">
                    {FLEX_OPTS.map(opt => {
                        const isTodayChip = opt.value === 'today';
                        const isActive = isTodayChip
                            ? (startKey === todayKey && !endKey)
                            : flex === opt.value;
                        return (
                            <button
                                key={String(opt.value)}
                                className={`v1cal__chip${isActive ? ' v1cal__chip--on' : ''}`}
                                style={{ minWidth: chipMinWidths[opt.value] }}
                                onClick={isTodayChip ? handleTodayChip : () => handleFlexChip(opt.value)}
                            >
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}