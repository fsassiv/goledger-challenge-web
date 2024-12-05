import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiHandleRequest = <T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> =>
  promise
    .then((response) => [undefined, response] as [undefined, T])
    .catch((error) => [error]);
