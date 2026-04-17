import React, { useEffect, useState } from 'react';
import BouncyText from '../_common/BouncyText/BouncyText';
import classNames from 'classnames';

export default function WelcomeToasty() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={classNames('welcome__toasty', { hidden: !visible })}>
            {visible && (
                <BouncyText
                    text='Welcome to Nestfy'
                    loop={false}
                    speed={500}
                    delay={50}
                    lift={4}
                    startAfter={850}
                    mode='rubber'
                />
            )}
        </div>
    );
}