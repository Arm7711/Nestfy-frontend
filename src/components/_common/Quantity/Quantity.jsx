import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuanity } from '../../../redux/reducers/quantityReducer';
import classNames from 'classnames';

function Quantity({ defaultCount, disabled = false, onQuantityChange, isCart = false }) {
    const dispatch = useDispatch();
    const [quantityCount, setQuantityCount] = useState(defaultCount || 0);

    const isDecreaseDisabled = quantityCount <= 0;
    const isIncreaseDisabled = quantityCount >= 30;

    const onChangeCount = (direction) => {
        setQuantityCount(prev => {
            let next = prev;
            if (direction && prev < 30) next = prev + 1;
            else if (!direction && prev > 0) next = prev - 1;

            if (onQuantityChange) onQuantityChange(next); 
            return next;
        });
    };

    if (isCart) {
        useEffect(() => {
            setQuantityCount(defaultCount);
        }, [defaultCount]);
    } else {
        useEffect(() => {
            dispatch(setQuanity(quantityCount));
        }, [quantityCount, dispatch]);
    }

    return (
        <div className='quantity'>
            <div
                className={classNames('quantity__count__dec', { disabled: isDecreaseDisabled })}
                onClick={() => !isDecreaseDisabled && !disabled && onChangeCount(false)}
            >
                -
            </div>
            <p className={classNames('quantity__count', { disable: disabled })}>{quantityCount}</p>
            <div
                className={classNames('quantity__count__inc', { disabled: isIncreaseDisabled })}
                onClick={() => !isIncreaseDisabled && !disabled && onChangeCount(true)}
            >
                +
            </div>
        </div>
    );
}

export default Quantity;
