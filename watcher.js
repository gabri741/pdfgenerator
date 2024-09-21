const chokidar = require('chokidar');
const mammoth = require('mammoth');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const watcher = chokidar.watch('caminho/para/sua/pasta', { persistent: true });

watcher.on('change', (path) => {
    if (path.endsWith('.docx')) {
        convertToPDF(path);
    }
});

function convertToPDF(docxPath) {
    const pdfPath = docxPath.replace(/\.docx$/, '.pdf');

    mammoth.extractRawText({ path: docxPath })
        .then((result) => {
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream(pdfPath));
            doc.text(result.value);n
            doc.end();
            console.log(`Arquivo PDF gerado: ${pdfPath}`);
        })
        .catch((err) => {
            console.error('Erro na conversão:', err);
        });
}

console.log('Monitorando alterações em arquivos .docx...');
