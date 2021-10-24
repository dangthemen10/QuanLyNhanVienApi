'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Department.hasMany(models.Employee, {
        foreignKey: "departmentId", 
        as: 'fk_dept_emp'
      })
    }
  };
  Department.init({
    deptId: DataTypes.STRING,
    deptName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};