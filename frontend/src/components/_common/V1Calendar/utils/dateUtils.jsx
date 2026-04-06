export const toKey = d => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
export const fromKey = k => new Date(~~(k / 10000), ~~(k % 10000 / 100) - 1, k % 100);
export const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

export function shiftMonth(y, m, off) {
    let ny = y, nm = m + off;
    while (nm > 11) { nm -= 12; ny++; }
    while (nm < 0) { nm += 12; ny--; }
    return [ny, nm];
}