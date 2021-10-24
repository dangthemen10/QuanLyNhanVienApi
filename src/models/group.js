'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.Employee, {foreignKey: "groupId", as:'fk_group_emp'})
    }
  };
  Group.init({
    roleGroup: DataTypes.INTEGER,
    groupName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};