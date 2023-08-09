# html2pdf-action

Github action to convert HTML documents to PDF using Puppeteer

## Usage

```yml
- name: Generate PDF
  uses: arthur-jaouen/html2pdf-action@main
  with:
    inputPath: './index.html'
    outputPath: './output.pdf'
    pdfOptions: '{"format": "A4", "printBackground": true, "preferCSSPageSize": true}'
```

See [Puppeteers options](https://github.com/puppeteer/puppeteer/blob/main/docs/api/puppeteer.pdfoptions.md#pdfoptions-interface) for all available PDF options
