const Diff = require('diff');

export const isCorrect = (fileA, fileB) => {
  fileA = fileA.replace(/(\r\n|\n|\r|\s\s+)/gm, "");
  fileB = fileB.replace(/(\r\n|\n|\r|\s\s+)/gm, "");
  const output = Diff.diffTrimmedLines(fileA, fileB, {newlineIsToken: false, ignoreWhitespace: true})
  return output.length === 1 && !output[0].added && !output[0].removed;
}

export const checkAnswer = (submittedAnswers, expectedAnswers) => {
  let isAllCorrect = true;
  Object.keys(submittedAnswers).forEach((filename) => {
    const submittedCode = submittedAnswers[filename];
    const targetCode = expectedAnswers[filename];
    isAllCorrect = isAllCorrect && isCorrect(submittedCode, targetCode);
  })
  return isAllCorrect;
}