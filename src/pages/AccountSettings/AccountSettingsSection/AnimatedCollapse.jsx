import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedCollapse({ open, isError = false, children }) {
    const innerRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (open && innerRef.current) {
            if (isError) {
                setHeight(innerRef.current.scrollHeight);
            } else {
                setHeight(innerRef.current.scrollHeight - 30);
            }
        } else {
            setHeight(0);
        }
    }, [open, isError]);

    return (
        <div
            className="animated_collapse"
            style={{
                height: `${height}px`,
                overflow: 'hidden',
                transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <div ref={innerRef}>{children}</div>
        </div>
    );
}