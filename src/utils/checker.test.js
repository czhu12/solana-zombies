import { isCorrect, checkAnswer } from './checker';

describe('checkAnswer', () => {
  it('recognizes equal', () => {
    const submittedAnswers = {
      file1: `
          let a = 1;
          let b = 2;
        `,
      file2: `
          let c = 1;
          let d = 2;
        `,
    };
    const expectedAnswers = {
      file1: `
          let a = 1;
          let b = 2;
        `,
      file2: `
          let c = 1;
          let d = 2;
        `,
    };
    expect(checkAnswer(submittedAnswers, expectedAnswers)).toEqual(true);
  });

  it('recognizes mistakes', () => {
    const submittedAnswers = {
      file1: `
          let a = 1;
          let b = 2;
        `,
      file2: `
          let c = 1;
          let d = 2;
        `,
    };
    const expectedAnswers = {
      file1: `
          let a = 2;
          let b = 3;
        `,
      file2: `
          let c = 4;
          let d = 5;
        `,
    };
    expect(checkAnswer(submittedAnswers, expectedAnswers)).toEqual(false);
  });
});
describe('isCorrect', () => {
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

    expect(isCorrect(`
      let a = 2;
      let b = 2;
    `, `
    `)).toEqual(false);

    expect(isCorrect(`
    `, `
      let a = 2;
      let b = 2;
    `)).toEqual(false);
  });
});