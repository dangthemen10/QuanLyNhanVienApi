'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        targetKey: 'id',
        as: 'fk_emp_dept',
        foreignKeyConstraint:true
      });

      Employee.belongsTo(models.Group, {
        foreignKey: 'groupId',
        targetKey: 'id',
        as: 'fk_emp_group',
        foreignKeyConstraint:true
      });

      Employee.belongsTo(models.Project, {
        foreignKey: 'projectId',
        targetKey: 'id',
        as: 'fk_emp_pro',
        foreignKeyConstraint:true
      });
    }
  };
  Employee.init({
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dayOfBirth: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    departmentId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};