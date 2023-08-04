const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db.js')

const UserModel = db.define('users',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  },
)

module.exports = UserModel
