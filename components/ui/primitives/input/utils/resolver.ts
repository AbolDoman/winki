import { InputSize } from '../api';

export function resolveIconSize(size: InputSize) {
  if (size === 'l' || size === '2xl') return 20;
  return 14;
}
