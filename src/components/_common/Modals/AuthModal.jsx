import React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

export default function AuthModal({ isOpen, onClose, children }) {
    return createPortal(
        <div className={classNames('auth__modal', { modal__active: isOpen })}>
            <div className='backdrop' />

            <div className='modal__main'>

            </div>
        </div>
    , document.getElementById('root'))
}
