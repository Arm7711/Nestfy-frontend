import { DayPicker } from 'react-day-picker';
import { useState, useEffect } from 'react';
import 'react-day-picker/dist/style.css';

tartOfMonth = (offset = 0) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() + offset);
    return d;
};

export default function Calendar({ onApply }) {
    return (
        <div className="calendar-scroll-container">
        </div>

    );
}