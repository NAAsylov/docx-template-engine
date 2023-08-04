const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db.js')

/** TODO: Добавить связь в таблицей users, для личных документов. */
const DocumentModel = db.define('documents',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('public', 'private'),
      allowNull: false,
    },
    file: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    pdf: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
)

module.exports = DocumentModel
