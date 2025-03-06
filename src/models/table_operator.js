'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class table_operator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      table_operator.belongsTo(models.table_karyawan, {
        foreignKey: 'id_karyawan'
      });
    }
  }
  table_operator.init({
    nama_operator: DataTypes.STRING,
    nama_product: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    role: DataTypes.STRING,
    status: DataTypes.STRING,
    id_karyawan: {
      type: DataTypes.INTEGER,
      references: {
        model: 'table_karyawans',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'table_operator',
  });
  return table_operator;
};