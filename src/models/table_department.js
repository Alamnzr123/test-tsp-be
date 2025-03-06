'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class table_department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      table_department.hasMany(models.table_jabatan, {
        foreignKey: 'id_department',
      })
    }
  }
  table_department.init({
    nama_department: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'table_department',
  });
  return table_department;
};