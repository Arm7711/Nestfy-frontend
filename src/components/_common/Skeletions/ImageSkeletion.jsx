import React, { Children, useState } from 'react';
import classNames from 'classnames';

/**
 * ImageSkeleton
 *
 * variants:    'avatar' | 'card' | 'banner' | 'thumbnail'
 * rounded:     'full' | 'lg' | 'md' | 'sm' | 'none'
 * fit:         'cover' | 'contain' | 'fill'
 */

export default function ImageSkeleton({
    src,
    alt = '',
    variant = 'card',
    rounded = 'md',
    fit = 'cover',
    width,
    height,
    className,
    figureClass,
    imgClass,
    draggable = false,
    onClick,
    children
}) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <figure
            onClick={onClick}
            className={classNames(
                'img__skeleton__figure',
                `variant--${variant}`,
                `rounded--${rounded}`,
                { loaded, error },
                figureClass
            )}
            style={{ width: width ?? undefined, height: height ?? undefined }}
        >
            {!loaded && !error && <div className='img__skeleton__pulse' />}

            {error && (
                <div className='img__skeleton__error'>
                    <span className='img__skeleton__error__icon'>✕</span>
                </div>
            )}

            {src && !error && (
                <img
                    src={src}
                    alt={alt}
                    draggable={draggable}
                    className={classNames(
                        'img__skeleton__img',
                        `fit--${fit}`,
                        `rounded--${rounded}`,
                        { visible: loaded },
                        imgClass,
                        className
                    )}
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                />
            )}

            {children && (
                <div className='img__skeleton__children'>
                    {children}
                </div>
            )}
        </figure>
    );
}