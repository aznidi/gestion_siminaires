import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine et fusionne des classes CSS avec clsx et tailwind-merge
 * @param {...string} inputs - Classes CSS à combiner
 * @returns {string} - Classes CSS fusionnées
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
} 