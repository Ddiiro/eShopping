import {expect, it } from 'vitest'
import { formatCurrency } from './currency'

it('converts 1091 cents as $10.91', () => {
    expect(formatCurrency(1091)).toBe('$10.91');
});