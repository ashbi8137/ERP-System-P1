
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

/**
 * It provides extra utility functions for:
 * Creating and checking dates
 * Comparing dates
 * Formatting dates as strings 
**/

const monthNames: string[] = [
 'Jan',
 'Feb',
 'Mar',
 'Apr',
 'May',
 'Jun',
 'Jul',
 'Aug',
 'Sep',
 'Oct',
 'Nov',
 'Dec',
];

export class UIDate extends NgbDate {
  /**
  * Creates and returns an empty date instance (0, 0, 0).
  * Useful for representing an uninitialized or default date.
  **/

  static isUIDate(value: unknown){
    const data = value as UIDate;
    //Checks if a given value has valid day, month, and year.
    return data.day != null && data.month != null && data.year != null
  }

  static emptyDate(): UIDate {
    return new UIDate(0, 0, 0);
  }
  
  static newDate(data: Pick<UIDate, 'year' | 'month' | 'day'>) {
   return new UIDate(data.year, data.month, data.day);
  }

  /**
  * Checks if date a is before date b.
  * Uses NgbDate’s .before() method, which compares dates properly.
  **/

  static beforeDate(a: UIDate, b: UIDate): boolean {
   a.before = NgbDate.prototype.before;
   return a.before(b);
  }

  /**
  * Converts a UIDate object into a formatted date string.
  * @param date - The UIDate object to format.
  * @param showMonthName - If true, the month name (e.g., "Jan") is used instead of the numeric value.
  * @param delimeter - The separator to use between date parts ('/' or '-'), defaults to '-'.
  * @returns A formatted date string or 'Invalid date' if the date is out of valid range.
  */
 
  static toDateString(
    date: UIDate | undefined | null,
    showMonthName: boolean,
    delimeter: '/' | '-' = '-'
    ) {
    if (!date || !date.day || !date.month || !date.year) return 'Invalid date';
    if (
      date.day < 0 ||
      date.day > 31 ||
      date.month < 1 ||
      date.month > 12 ||
      date.year < 0)
      return 'Invalid date';
    //Formats the date as a string.
    const month = showMonthName ? monthNames[date.month - 1] : date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    const year = date.year.toString().padStart(4, '0');
      return `${day}${delimeter}${month}${delimeter}${year}`;
 }
}