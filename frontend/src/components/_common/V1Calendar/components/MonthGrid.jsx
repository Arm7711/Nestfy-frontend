import { useMemo } from 'react';
import DayCell from './DayCell.jsx';
import { buildCells } from '../utils/buildCells.jsx';

function MonthGrid({ year, month, startKey, endKey, hovKey, flex, todayKey, minKey,
    onEnter, onLeave, onClick }) {
    const cells = useMemo(
        () => buildCells(year, month, todayKey, minKey, startKey, endKey, hovKey, flex),
        [year, month, todayKey, minKey, startKey, endKey, hovKey, flex],
    );

    const hasEndKey = !!endKey;

    return (
        <div className="v1cal__grid">
            {cells.map((cell) => (
                <DayCell
                    key={cell.key}
                    cell={cell}
                    onEnter={onEnter}
                    onLeave={onLeave}
                    onClick={onClick}
                    hasEndKey={hasEndKey}
                />
            ))}
        </div>
    );
}

export default MonthGrid;