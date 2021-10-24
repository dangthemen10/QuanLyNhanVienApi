'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Models/tables
db.department = require('../models/department')(sequelize, Sequelize);
db.employee = require('../models/employee')(sequelize, Sequelize);
db.group = require('../models/group')(sequelize, Sequelize);
db.project = require('../models/project')(sequelize, Sequelize);
db.user = require('../models/user')(sequelize, Sequelize);

//Relations
db.employee.belongsTo(db.department);
db.employee.belongsTo(db.group);
db.employee.belongsTo(db.project);

db.department.hasMany(db.employee);
db.group.hasMany(db.employee);
db.project.hasMany(db.employee);

module.exports = db;
