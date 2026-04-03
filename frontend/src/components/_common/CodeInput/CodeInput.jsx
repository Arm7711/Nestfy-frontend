import React, { useRef, useEffect, useState } from 'react';

function CodeInput({
  length = 6,
  value = '',
  onChange,
  error = false,
  isActive = false,
}) {
  const inputsRef = useRef([]);
  const [animateIndexes, setAnimateIndexes] = useState([]);

  const values = value
    .split('')
    .concat(Array(length).fill(''))
    .slice(0, length);

  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 600);
    return () => clearTimeout(timer);
  }, [isActive]);

  const emit = (arr) => {
    const next = arr.join('').slice(0, length);
    onChange?.(next);
  };

  const handleChange = (e, idx) => {
    const val = e.target.value;

    if (val.length > 1) return;
    if (val && !/^[0-9]$/.test(val)) return;

    const arr = [...values];
    arr[idx] = val;

    setAnimateIndexes((p) => [...p, idx]);
    emit(arr);

    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    const arr = [...values];

    if (e.key === 'Backspace') {
      if (arr[idx]) {
        arr[idx] = '';
      } else if (idx > 0) {
        arr[idx - 1] = '';
        inputsRef.current[idx - 1]?.focus();
      }

      emit(arr);
      e.preventDefault();
    }

    if (e.key === 'ArrowLeft' && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }

    if (e.key === 'ArrowRight' && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const paste = e.clipboardData
      .getData('text')
      .slice(0, length)
      .replace(/\D/g, '');

    const arr = Array(length).fill('');
    paste.split('').forEach((c, i) => (arr[i] = c));

    emit(arr);

    const last = Math.min(paste.length, length - 1);
    inputsRef.current[last]?.focus();

    setAnimateIndexes(paste.split('').map((_, i) => i));
  };

  useEffect(() => {
    if (!animateIndexes.length) return;

    const t = setTimeout(() => setAnimateIndexes([]), 300);
    return () => clearTimeout(t);
  }, [animateIndexes]);

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {values.map((val, idx) => {
        const shouldAnimate = animateIndexes.includes(idx);

        return (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            value={val}
            maxLength={1}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            autoComplete="off"
            spellCheck="false"
            style={{
              width: 46,
              height: 48,
              fontSize: 24,
              textAlign: 'center',
              border: '1px solid',
              borderRadius: 6,
              outline: 'none',
              backgroundColor: 'rgba(243,243,243,0.7)',
              transition: 'border-color 0.3s, transform 0.2s',
              borderColor: error
                ? 'red'
                : val
                ? 'black'
                : 'rgba(73,73,73,0.3)',
              transform: shouldAnimate ? 'translateY(-1px)' : 'translateY(0)',
              color: 'rgb(37,37,37)',
            }}
          />
        );
      })}
    </div>
  );
}

export default CodeInput;