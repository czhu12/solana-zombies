import { isCorrect, checkAnswer } from './checker';

describe('checker', () => {
  it('recognizes equal files', () => {
    const submitted = `
      let a = 1;
      let b = 2;
    `;
    const target = `
      let a = 1;
      let b = 2;
    `;
    expect(isCorrect(`
      let a = 1;
      let b = 2;
    `, `
      let a = 1;
      let b = 2;
    `)).toEqual(true);
  });

  it('doesnt account for new lines and whitespace', () => {
    expect(isCorrect(`
            let a = 1;

            let b = 2;
    `, `
      let a = 1;
      let b = 2;
    `)).toEqual(true);
  });

  it('returns false for wrong submission', () => {
    expect(isCorrect(`
      let a = 2;

      let b = 2;
    `, `
      let a = 1;
      let b = 2;
    `)).toEqual(false);
  })
});