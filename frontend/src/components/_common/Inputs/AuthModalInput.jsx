import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInputValue } from '../../../redux/reducers/inputsValueReducer';
import classNames from 'classnames';


export default function AuthModalInput({ onSubmit, activeError, loaderAuth }) {
    const dispatch = useDispatch();
    const [inpuValue, sethInputValue] = useState('');

    const changeInputValue = (value) => {
        sethInputValue(value);
        dispatch(setAuthInputValue(value))
    }

    return (
        <form className={classNames('auth__input__form', { active__error: !activeError, loading__active: loaderAuth })} id='auth__form' onSubmit={onSubmit}>
            <input
                type="text"
                id="a__input"
                className={classNames('auth__input', { active__error: !activeError, loading__active: loaderAuth })}
                onChange={({ target }) => changeInputValue(target.value)}
                value={inpuValue}
                placeholder=' '
            />
            <label htmlFor="a__input" className={classNames('auth__input__label', { active__error: !activeError, loading__active: loaderAuth })}>Phone number or email</label>
        </form >
    )
}
