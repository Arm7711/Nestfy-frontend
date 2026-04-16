import React from 'react';
import BouncyText from '../_common/BouncyText/BouncyText';

export default function WelcomeToasty() {
    return (
        <div className='welcome__toasty'>
            <BouncyText
                key={Date.now()}
                text='Welcome to Nestfy'
                loop={true}
                speed={500}
                delay={50}
                lift={4}
                startAfter={850}
                mode='rubber'
            />
        </div>
    )
}
