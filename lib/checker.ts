const isObject = require('isobject');
import { Buffer } from 'buffer';

export default class Checker {
  static isBoolean(value: any): boolean {
    return typeof(value) === 'boolean';
  }

  static isString(value: any): boolean {
    return typeof(value) === 'string';
  }

  static isObject(value: any): boolean {
    return isObject(value);
  }

  static isBuffer(value: any): boolean {
    return Buffer.isBuffer(value);
  }
}
