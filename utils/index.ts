import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const COLORS = {
  PRIMARY: '#9a3412',
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};