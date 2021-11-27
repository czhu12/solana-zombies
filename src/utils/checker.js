import Diff from 'diff';

const isCorrect = (fileA, fileB) => {
  const output = Diff.diffTrimmedLines(fileA, fileB, {newlineIsToken: false})
  return output.length === 0;
}

export default checkAnswer = (submittedAnswers, expectedAnswers) => {
  submittedAnswers.forEach((filename, code) => {
    const submittedCode = submittedAnswers[filename];
    const targetCode = expectedAnswers[filename];
    isCorrect(submittedCode, targetCode);
  })
}