import { useRef, useLayoutEffect } from 'react';
import AnimTitle from './AnimTitle.jsx';
import MonthGrid from './MonthGrid.jsx';
import { WEEKDAYS } from '../constants.jsx';
import { shiftMonth } from '../utils/dateUtils.jsx';

function MonthColumn({
    colOffset,
    baseYear, baseMonth,
    animPhase, animDir, animKey,
    prevYear, prevMonth,
    startKey, endKey, hovKey, flex, todayKey, minKey,
    onEnter, onLeave, onClick,
}) {
    const trackRef = useRef(null);

    const [curY, curM] = shiftMonth(baseYear, baseMonth, colOffset);
    const [prvY, prvM] = shiftMonth(
        prevYear ?? baseYear,
        prevMonth ?? baseMonth,
        colOffset,
    );

    useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        if (animPhase === 'running') {
            if (animDir > 0) {
                track.style.transition = 'none';
                track.style.transform = 'translateX(0)';
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    track.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1)';
                    track.style.transform = 'translateX(-50%)';
                }));
            } else {
                track.style.transition = 'none';
                track.style.transform = 'translateX(-50%)';
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    track.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1)';
                    track.style.transform = 'translateX(0)';
                }));
            }
        } else {
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
        }
    }, [animPhase, animDir]);

    let leftY, leftM, rightY, rightM;
    if (animPhase === 'running') {
        if (animDir > 0) { [leftY, leftM] = [prvY, prvM];[rightY, rightM] = [curY, curM]; }
        else { [leftY, leftM] = [curY, curM];[rightY, rightM] = [prvY, prvM]; }
    } else {
        [leftY, leftM] = [curY, curM];[rightY, rightM] = [curY, curM];
    }

    const gridProps = { startKey, endKey, hovKey, flex, todayKey, minKey, onEnter, onLeave, onClick };

    return (
        <div className="v1cal__col">
            <AnimTitle year={curY} month={curM} dir={animDir} animKey={animKey} />
            <div className="v1cal__weekdays">
                {WEEKDAYS.map((w, i) => <div key={i} className="v1cal__wd">{w}</div>)}
            </div>
            <div className="v1cal__grid-outer">
                <div className="v1cal__grid-track" ref={trackRef}>
                    <MonthGrid year={leftY} month={leftM}  {...gridProps} />
                    <MonthGrid year={rightY} month={rightM} {...gridProps} />
                </div>
            </div>
        </div>
    );
}

export default MonthColumn;