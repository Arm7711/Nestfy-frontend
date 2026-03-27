import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInputValue } from '../../../redux/reducers/inputsValueReducer';


export default function AuthModalInput({onSubmit}) {
    const dispatch = useDispatch();
    const [inpuValue, sethInputValue] = useState('');

    const changeInputValue = (value) => {
        sethInputValue(value);
        dispatch(setAuthInputValue(value))
    }

    return (
        <form className='auth__input__form' id='auth__form' onSubmit={onSubmit}>
            <input
                type="text"
                id="a__input"
                className='auth__input'
                onChange={({ target }) => changeInputValue(target.value)}
                value={inpuValue}
                placeholder=' '
            />
            <label htmlFor="a__input" className='auth__input__label'>Phone number or email</label>
        </form>
    )
}
