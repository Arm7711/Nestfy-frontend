import { useEffect, useState } from 'react';

export default function useIsAtTop(offset = 0) {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setIsTop(y <= offset);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [offset]);

    return isTop;
}