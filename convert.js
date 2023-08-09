import actions from '@actions/core';
import finalhandler from 'finalhandler';
import http from 'http';
import puppeteer from 'puppeteer';
import serveStatic from 'serve-static';

function serve(path) {
  const serve = serveStatic(path, { index: ['index.html'] });
  const server = http.createServer((req, res) => serve(req, res, finalhandler(req, res)));

  server.listen(3000);

  return server.close.bind(server);
}

async function convert(inputPath, outputPath, pdfOptions, launchOptions) {
  const close = serve(process.cwd());
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  const url = 'http://localhost:3000/' + inputPath;

  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.pdf({ ...pdfOptions, path: outputPath });
  await browser.close();

  close();
}

async function run() {
  try {
    const inputPath = actions.getInput('inputPath');
    const outputPath = actions.getInput('outputPath');
    const pdfOptions = actions.getInput('pdfOptions');

    await convert(inputPath, outputPath, pdfOptions ? JSON.parse(pdfOptions) : {}, {
      headless: 'new',
      args: ['--no-sandbox', '--headless', '--disable-gpu', '--font-render-hinting=medium'],
    });
  } catch (error) {
    actions.setFailed(error.message);
  }
}

run();
