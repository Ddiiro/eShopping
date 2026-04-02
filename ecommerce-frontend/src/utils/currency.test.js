import {expect, it } from 'vitest'
import { formatCurrency } from './currency'

it('converts 1091 cents as $10.91', () => {
    expect(formatCurrency(1091)).toBe('$10.91');
});

it('converts 100 to 1.0', () => {
    expect(formatCurrency(100)).toBe('$1.00');
    expect(formatCurrency(1090)).toBe('$10.90')
})