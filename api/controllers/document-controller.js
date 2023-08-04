const documentService = require('../services/document-service');

class DocumentController {
  async getAll(req, res, next) {
    try {
      const documents = await documentService.getAll();
      res.json(documents);
    } catch (error) {
      next(error);
    }
  }

  async newDocument(req, res, next) {
    try {
      const { name, type, file } = req.body;
      const document = await documentService.newDocument(name, type, file);
      res.json(document);
    } catch (error) {
      next(error);
    }
  }

  async downloadDocument(req, res, next) {
    const { id } = req.body;
    documentService.downloadDocument(id)
  }
}

module.exports = new DocumentController();
