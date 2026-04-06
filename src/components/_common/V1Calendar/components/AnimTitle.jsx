import { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { MONTHS } from '../constants.jsx';

function AnimTitle({ year, month, dir, animKey }) {
    const label = `${MONTHS[month]} ${year}`;
    const [slots, setSlots] = useState([{ label, id: 0, phase: 'visible' }]);
    const nextId = useRef(1);
    const isFirst = useRef(true);

    useEffect(() => {
        if (isFirst.current) { isFirst.current = false; return; }

        const id = nextId.current++;

        flushSync(() => {
            setSlots(prev => [
                ...prev.map(s => ({ ...s, phase: dir > 0 ? 'exit-left' : 'exit-right' })),
                { label, id, phase: dir > 0 ? 'enter-right' : 'enter-left' }
            ]);
        });

        requestAnimationFrame(() => {
            setSlots(prev => prev.map(s => s.id === id ? { ...s, phase: 'visible' } : s));
        });

        const t = setTimeout(() => setSlots(prev => prev.filter(s => s.id === id)), 380);
        return () => clearTimeout(t);
    }, [animKey]);

    return (
        <div className="v1cal__title-wrap">
            {slots.map(s => (
                <div key={s.id} className={`v1cal__title v1cal__title--${s.phase}`}>{s.label}</div>
            ))}
        </div>
    );
}

export default AnimTitle;