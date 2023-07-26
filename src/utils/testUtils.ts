import { check } from 'k6';
import { Checkers } from 'k6';

/**
 * converts object into GET request query params
 * @param obj GET request query params
 * @returns query params in string format
 */
export function objectToQueryParams(obj: Record<string, string>) {
  if (!obj || Object.keys(obj).length === 0) {
    return '';
  }

  const queryParams = Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `?${queryParams}`;
}

/**
 * given the title and a list of data, print the values in a table format in the console
 * @param title title of the table
 * @param data data of the table
 */
export function printTable(title: string, data: string[][]) {
  let table = `\n${title}\n`;

  for (let i = 0; i < title.length; i++) {
    table += '-';
  }

  table += '\n';

  data.forEach((row) => {
    table += `${row.join(' | ')}\n`;
  });

  table += '\n';

  console.log(table);
}

/**
 * given nested lists, index and direction, return if the list is sorted by the index in direction order.
 * Eg.
 * `isNestedListSorted([[1, 223], [2, 43]], 0, 'asc')` returns true
 * `isNestedListSorted([[1, 223], [2, 43]], 1, 'asc')` returns false
 * @param list nested list of strings of numbers
 * @param columnIndex index of the value to check for in nested list
 * @param direction direction to check if the list is sorted
 * @returns if the list is sorted by the index in direction order
 */
export function isNestedListSorted(
  list: (number | string)[][],
  index: number,
  direction: 'asc' | 'dsc' = 'asc',
) {
  const compareFn =
    direction === 'asc'
      ? (a: number | string, b: number | string) => a < b
      : (a: number | string, b: number | string) => a > b;

  for (let i = 1; i < list.length; i++) {
    if (compareFn(list[i][index], list[i - 1][index])) {
      return false;
    }
  }

  return true;
}

/**
 * given a name, return a function that add the name as a prefix for each of the set in check
 * @param name name to be prefixed to each of the message in check
 * @returns a new check function that prefix the provided name in each set message
 */
export function createNamedCheck(name: string) {
  return function namedCheck<T>(val: T, sets: Checkers<T>, tags?: object) {
    check(
      val,
      Object.entries(sets).reduce(
        (acc, [message, fn]) => ({ ...acc, [`${name}: ${message}`]: fn }),
        {},
      ),
      tags,
    );
  };
}
