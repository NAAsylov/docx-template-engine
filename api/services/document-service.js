const DocumentModel = require('../models/document-model');
const DocumentDto = require('../dtos/document-dto');
const ApiError = require('../exceptions/api-error')
const fs = require('node:fs');
const path = require('node:path');
const { Blob } = require('node:buffer');
const docx = require('docx');
const { PatchType, Paragraph, TextRun } = require('docx');

class DocumentService {
  async getAll() {
    return (await DocumentModel.findAll()).map((document) => new DocumentDto(document));
  }

  async newDocument(name, type, file) {
    const buffer = Buffer.from(file, 'base64');

    const document = await DocumentModel.create({
      name: name || 'Document',
      type: type || 'public',
      file: buffer,
    });

    return new DocumentDto(document);
  }

  async downloadDocument(id) {
    const target_document = await DocumentModel.findOne({ where: { id }});

    if (!target_document) {
      throw ApiError.BadRequest('Документ с таким id не найден.');
    }

    const documentDto = new DocumentDto(target_document);

    const document_uint_array = await docx.patchDocument(documentDto.data, {
      patches: {
        fio: {
          type: PatchType.PARAGRAPH,
          children: [new TextRun("Sir. "), new TextRun("John Doe"), new TextRun("(The Conqueror)")],
        },
        date: {
          type: PatchType.DOCUMENT,
          children: [
            new Paragraph("Lorem ipsum paragraph"),
            new Paragraph("Another paragraph"),
          ],
        }
      }
    });

    // fs.writeFileSync(path.join(__dirname, 'new-document.docx'), doc);
    return Buffer.from(document_uint_array).toString('base64');
  }
}

module.exports = new DocumentService();
