import React from 'react';

export default function Button(
    { className = 'common__button', type, form, id, disbaled, min = false, middle = false, max = false, children, borderRadius, width, height, onClick }
) {
    return (
        <button
            id={id}
            type={type}
            form={form}
            disabled={disbaled}
            className={className}

            style={{
                borderRadius,
                width: min ? 88 : middle ? 135 : max ? 155 : width,
                height: min ? 48 : middle ? 50 : max ? 52 : height,
            }}


            onClick={onClick}
        >
            {children || 'button'}
        </button>
    )
}
