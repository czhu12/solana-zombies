const Diff = require('diff');

export const isCorrect = (fileA, fileB) => {
  fileA = fileA.replace(/(\r\n|\n|\r|\s)/gm, "");
  fileB = fileB.replace(/(\r\n|\n|\r|\s)/gm, "");
  const output = Diff.diffTrimmedLines(fileA, fileB, {newlineIsToken: false, ignoreWhitespace: true})
  return output.length === 1;
}

export const checkAnswer = (submittedAnswers, expectedAnswers) => {
  submittedAnswers.forEach((filename, code) => {
    const submittedCode = submittedAnswers[filename];
    const targetCode = expectedAnswers[filename];
    isCorrect(submittedCode, targetCode);
  })
}