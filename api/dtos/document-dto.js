module.exports = class DocumentDto {
  id;
  name;
  type;
  file;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.type = model.type;
    this.file = model.file;
  }
}
