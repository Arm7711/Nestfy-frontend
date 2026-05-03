import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import useIsAtTop from '../../hooks/useIsAtTop';

import CouponSvg from '../../assets/images/icons/coupon-svg.svg?react';
import BouncyText from '../_common/BouncyText/BouncyText';

export default function WelcomeToasty() {
    const [visible, setVisible] = useState(true);
    const isTop = useIsAtTop();

    useEffect(() => {
        if (isTop) return;

        const timer = setTimeout(() => {
            setVisible(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [isTop]);

    return (
        <div className={classNames('welcome__toasty', { hidden: !visible })}>
            {visible && (
                <>
                    <span className='icon__container'>
                        <CouponSvg className='icon' />
                    </span>
                    
                    <BouncyText
                        text='Welcome to Nestfy'
                        loop={true}
                        speed={700}
                        delay={30}
                        lift={5}
                        startAfter={850}
                        mode='wave'
                    />
                </>
            )}
        </div>
    );
}