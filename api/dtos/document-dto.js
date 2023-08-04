module.exports = class DocumentDto {
  id;
  name;
  type;
  file;
  pdf;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.type = model.type;
    this.file = model.file;
    this.pdf = model.pdf;
  }
}
