import React, { useState } from 'react';
import classNames from 'classnames';

const TextareaCounter = ({
    value = '',
    onChange,
    max_length = 500,
    placeholder = '',
    label,
    error,
    disabled = false,
    rows = 4,
    show_counter = true
}) => {
    const [text, setText] = useState(value);

    const handleChange = (e) => {
        const new_value = e.target.value;
        if (max_length && new_value.length > max_length) return;

        setText(new_value);
        if (onChange) {
            onChange(new_value);
        }
    };

    const remaining_chars = max_length - text.length;

    return (
        <div className={classNames('textarea_counter', { error: error })}>
            {label && <label className='textarea_counter_label'>{label}</label>}

            <textarea
                className={classNames('textarea_counter_input', {
                    near_limit: remaining_chars <= 20 && remaining_chars > 0
                })}
                value={text}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                maxLength={max_length}
            />

            {show_counter && (
                <div className='textarea_counter_counter'>
                    {text.length} / {max_length}
                </div>
            )}

            {error && <div className='textarea_counter_error'>{error}</div>}
        </div>
    );
};

export default TextareaCounter;