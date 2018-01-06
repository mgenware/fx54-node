import main from '../lib/main';

function resolve(file: string): string {
  return `./tests/data/${file}`;
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
});
