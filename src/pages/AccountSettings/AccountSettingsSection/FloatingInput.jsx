import React from 'react';

export default function FloatingInput({
    id,
    label,
    value,
    onChange,
    type = 'text',
    mask = null,
    maxLength = null,
}) {

    const formatDate = (raw, separator = '/') => {
        let digits = String(raw).replace(/\D/g, '').slice(0, 8);

        const day = digits.slice(0, 2);
        const month = digits.slice(2, 4);
        const year = digits.slice(4, 8);

        const parts = [];

        if (day) parts.push(day);
        if (month) parts.push(month);
        if (year) parts.push(year);

        return parts.join(separator);
    };

    const handleChange = (e) => {
        let rawInput = e.target.value;
        let formatted = rawInput;

        if (mask === 'date-slash') {
            formatted = formatDate(rawInput, '/');
        } else if (mask === 'date-dot') {
            formatted = formatDate(rawInput, '.');
        }

        onChange(formatted);
    };

    return (
        <div className="floating_input">
            <input
                id={id}
                className="floating_input__field"
                type={type}
                placeholder=" "
                value={value}
                onChange={handleChange}
                autoComplete="off"
                maxLength={maxLength}
            />
            <label className="floating_input__label" htmlFor={id}>
                {label}
            </label>
        </div>
    );
}