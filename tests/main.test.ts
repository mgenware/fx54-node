import main from '../lib/main';

const DATA_DIR = './tests/data';

function resolve(file: string = ''): string {
  return `${DATA_DIR}/${file}`;
}

describe('validateFile', () => {
  test('bool(true) resolved', async () => {
    await expect(main.validateFileAsync(resolve('a.txt'), true)).resolves.toBeUndefined();
  });
  test('bool(true) rejected', async () => {
    await expect(main.validateFileAsync(resolve('b.txt'), true)).rejects.toThrow();
  });
  test('bool(false) resolved', async () => {
    await expect(main.validateFileAsync(resolve('b.txt'), false)).resolves.toBeUndefined();
  });
  test('bool(false) rejected', async () => {
    await expect(main.validateFileAsync(resolve('a.txt'), false)).rejects.toThrow();
  });

  test('string resolved', async () => {
    await expect(main.validateFileAsync(resolve('a.txt'), 'test')).resolves.toBeUndefined();
  });
  test('string rejected', async () => {
    await expect(main.validateFileAsync(resolve('a.txt'), '__')).rejects.toThrow();
  });
  test('string rejected (file not found)', async () => {
    await expect(main.validateFileAsync(resolve('b.txt'), '__')).rejects.toThrow();
  });
});

describe('validateDirectory', () => {
  test('validateFileAsync resolved', async () => {
    await expect(main.validateDirectoryAsync(resolve(), {root: {child: {'b.txt': 'test'}}})).resolves.toBeUndefined();
  });
  test('validateFileAsync (relative path) resolved', async () => {
    await expect(main.validateDirectoryAsync(DATA_DIR, {root: {child: {'b.txt': 'test'}}})).resolves.toBeUndefined();
  });
  test('validateFileAsync rejected', async () => {
    await expect(main.validateDirectoryAsync(resolve(), {root: {child: {'b.txt': '__'}}})).rejects.toThrow();
  });
});
