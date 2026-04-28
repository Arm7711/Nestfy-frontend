import React from 'react';
import classNamesReact from 'classnames';
import LoadingDot from '../Loaders/LoadingDot';

export default function Button(
    {
        className = 'common__button',
        classNames = {},
        variants = 'primary',
        type,
        form,
        id,
        disbaled,
        min = false,
        middle = false,
        max = false,
        children,
        borderRadius,
        width,
        height,
        onClick,
        loading = false,
        ...props
    }
) {
    return (
        <button
            id={id}
            type={type}
            form={form}
            disabled={disbaled}
            className={classNamesReact({
                'min': min,
                'mid': middle,
                'max': max,
                loading,
                'primary': variants === 'primary',
                'secondary': variants === 'secondary',
                ...classNames
            }, className)}

            style={{
                borderRadius,
            }}

            onClick={onClick}
        >
            {loading ? <LoadingDot /> : children || 'button'}
        </button>
    )
}
