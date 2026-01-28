// import './style.css'

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { PDFField } from 'pdf-lib';

function downloadFile(fileName: string, uint8Array: Uint8Array<ArrayBuffer>) {
  let blob = new Blob([uint8Array], { type: 'application/octet-stream' });
  var href = URL.createObjectURL(blob);
  // 從 Blob 取出資料
  var link = document.createElement("a");
  document.body.appendChild(link);
  link.href = href;
  link.download = fileName;
  link.click();
  document.body.removeChild(link);
}

(async () => {
  const res = await fetch("create_form.pdf");
  const ab = await res.arrayBuffer();
  const pdfDoc = await PDFDocument.load(ab);
  const form = pdfDoc.getForm();

  form.getFields().forEach((field: PDFField) => {
    const type = field.constructor.name;
    const name = field.getName();
    console.log(`${type}: ${name}`);
  });

  form.getTextField('favorite.superhero').setText('Hello World');
  const radioGroup = form.getRadioGroup('favorite.rocket')
  const options = radioGroup.getOptions();
  radioGroup.select(options[options.length - 1]);

  const pdfBytes = await pdfDoc.save();
  downloadFile("123.pdf", new Uint8Array(pdfBytes));
})();



// Fill the text fields with some fancy Unicode characters (outside
// the WinAnsi latin character set)
/*
async function createPdf() {
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  const pdfBytes = await pdfDoc.save()
}
*/

// ((appContainer: HTMLDivElement | null) => {
//   if (!appContainer) {
//     return;
//   }

//   appContainer.appendChild(timetableContainer);
// })(document.querySelector<HTMLDivElement>('#app')!)