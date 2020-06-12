const { createWorker } = require('tesseract.js');

const worker = createWorker();

async function getTextFromImage(path) {
  await worker.load()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')

  const { data: { text } } = await worker.recognize('./' + path);

  await worker.terminate()

  return text
}