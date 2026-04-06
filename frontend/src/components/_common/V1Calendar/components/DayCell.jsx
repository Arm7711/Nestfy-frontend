function DayCell({ cell, onEnter, onLeave, onClick }) {
    if (!cell) return <div className="v1cal__cell v1cal__cell--empty" />;

    if (cell.isOtherMonth && cell.day === null) {
        const cls = [
            'v1cal__cell',
            'v1cal__cell--empty',
            'v1cal__cell--other-month',
            cell.isEmptyBeforeFirst && 'v1cal__cell--before-first',
            cell.isEmptyAfterLast && 'v1cal__cell--after-last',
            cell.inRange && 'v1cal__cell--in-range',
        ].filter(Boolean).join(' ');

        const hasBg = cell.isEmptyBeforeFirst || cell.isEmptyAfterLast;

        return (
            <div className={cls}>
                {hasBg && <div className="v1cal__cell-bg" />}
            </div>
        );
    }

    const {
        key, day, disabled, isToday, isEffStart, isEffEnd, inRange,
        isHoverEnd, isDark, isSunday, isMonday
    } = cell;

    const cls = [
        'v1cal__cell',
        disabled && 'v1cal__cell--disabled',
        isToday && 'v1cal__cell--today',
        isEffStart && 'v1cal__cell--start',
        isEffEnd && 'v1cal__cell--end',
        isEffStart && isEffEnd && 'v1cal__cell--single',
        inRange && 'v1cal__cell--in-range',
        isHoverEnd && 'v1cal__cell--hover-end',
        isSunday && 'v1cal__cell--sunday',
        isMonday && 'v1cal__cell--monday',
    ].filter(Boolean).join(' ');

    const numCls = ['v1cal__cell-num', isDark && 'v1cal__cell-num--dark'].filter(Boolean).join(' ');

    return (
        <div
            className={cls}
            onMouseEnter={!disabled ? () => onEnter(key) : undefined}
            onMouseLeave={!disabled ? onLeave : undefined}
            onClick={!disabled ? () => onClick(key) : undefined}
        >
            <div className="v1cal__cell-bg" />
            <div className={numCls}>{day}</div>
        </div>
    );
}

export default DayCell;