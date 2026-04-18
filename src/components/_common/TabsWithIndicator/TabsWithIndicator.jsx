import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';

export default function TabsWithIndicator({
    items,
    activeId,
    onChange,
    className,
    renderItem
}) {
    const refs = useRef(new Map());
    const containerRef = useRef(null);

    const [indicator, setIndicator] = useState({
        width: 0,
        x: 0
    });

    const updateIndicator = useCallback(() => {
        const el = refs.current.get(activeId);
        const container = containerRef.current;

        if (!el || !container) return;

        const rect = el.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();

        setIndicator({
            width: rect.width,
            x: rect.left - parentRect.left
        });
    }, [activeId]);

    useLayoutEffect(() => {
        updateIndicator();

        const ro = new ResizeObserver(updateIndicator);

        refs.current.forEach(el => el && ro.observe(el));

        return () => ro.disconnect();
    }, [updateIndicator]);

    return (
        <div ref={containerRef} className={className}>
            <span
                style={{
                    width: indicator.width,
                    transform: `translateX(${indicator.x}px)`
                }}
                className="tabs-indicator"
            />

            {items.map(item => (
                <div
                    key={item.id}
                    ref={el => {
                        if (el) refs.current.set(item.id, el);
                        else refs.current.delete(item.id);
                    }}
                    onClick={() => onChange(item.id)}
                >
                    {renderItem
                        ? renderItem(item, item.id === activeId)
                        : item.label}
                </div>
            ))}
        </div>
    );
}