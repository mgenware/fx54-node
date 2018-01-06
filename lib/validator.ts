import checker from './checker';
import * as mfs from 'm-fs';
import * as nodepath from 'path';

export default class Validator {
  async validateFileAsync(path: string, value: any) {
    if (checker.isString(value)) {
      await this.validateStringAsync(path, value as string);
    } else if (checker.isBoolean(value)) {
      await this.validateBoolAsync(path, value as boolean);
    } else {
      throw new Error(`Unsupported value: ${value ? value.toString() : '<Empty>'}`);
    }
  }

  async validateDirectoryAsync(path: string, obj: any) {
    const keys = Object.keys(obj);
    for (const k of keys) {
      const value = obj[k];
      const subPath = nodepath.join(path, k);

      if (checker.isObject(value)) {
        await this.validateDirectoryAsync(subPath, value);
      } else {
        await this.validateFileAsync(subPath, value);
      }
    }
  }

  private async validateStringAsync(path: string, value: string) {
    const content = await mfs.readTextFileAsync(path);
    if (content !== value) {
      this.throwFailedError(path, 'String', value);
    }
  }

  private async validateBoolAsync(path: string, value: boolean) {
    const available = await mfs.fileExists(path);
    if (value !== available) {
      this.throwFailedError(path, 'Boolean', value);
    }
  }

  private throwFailedError(file: string, reqType: string, reqContent: any) {
    throw new Error(`Test failed. [File: ${file}] [Required type: ${reqType}] [Required content: ${reqContent}]`);
  }
}
