import React from 'react';
import classNamesButton from 'classnames';

export default function Button(
    { className, classNames, min = false, middle = false, max = false, children, borderRadius, width, height, onClick }
) {
    return (
        <button
            className={
                classNamesButton(
                    `common__button 
                    ${className}
                    `,
                    { ...classNames, min, middle, max }
                )
            }

            style={{
                borderRadius,
                width,
                height
            }}

            onClick={onClick}
        >
            {children || 'button'}
        </button>
    )
}
