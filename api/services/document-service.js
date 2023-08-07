const DocumentModel = require('../models/document-model');
const DocumentDto = require('../dtos/document-dto');
const ApiError = require('../exceptions/api-error')
const docx = require('docx');
const { PatchType, Paragraph, TextRun } = require('docx');
const fs = require('node:fs');
const path = require('node:path');

class DocumentService {
  async getAll() {
    return (await DocumentModel.findAll()).map((document) => new DocumentDto(document));
  }

  async newDocument(name, type, file) {
    const buffer = Buffer.from(file, 'base64');

    /** TODO: вместо buffer, в pdf нужно сохранять pdf файл. */
    const document = await DocumentModel.create({
      name: name || 'Document',
      type: type || 'public',
      file: buffer,
      pdf: buffer,
    });

    return new DocumentDto(document);
  }

  async downloadDocument(id, fio, count_day) {
    const target_document = await DocumentModel.findOne({ where: { id }});

    if (!target_document) {
      throw ApiError.BadRequest('Документ с таким id не найден.');
    }

    const documentDto = new DocumentDto(target_document);

    /** TODO: Нужно разобраться с ошибкой чтения файла из БД. */
    // const document_uint_array = await docx.patchDocument(documentDto.file, {
    const document_uint_array = await docx.patchDocument(fs.readFileSync(path.join(__dirname, 'document.docx')), {
      patches: {
        fio: {
          type: PatchType.PARAGRAPH,
          children: [new TextRun(fio)],
        },
        count_day: {
          type: PatchType.PARAGRAPH,
          children: [new TextRun(count_day)],
        }
      }
    });

    fs.writeFileSync(path.join(__dirname, 'new-document.docx'), document_uint_array);
    return Buffer.from(document_uint_array).toString('base64');
  }
}

module.exports = new DocumentService();
