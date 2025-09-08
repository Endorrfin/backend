// const { Sequelize } = require('sequelize');
// const logger = require('../../shared/utils/logger');
//
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//     logging: process.env.NODE_ENV === 'development' ? logger.debug.bind(logger) : false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }
// );
//
//
//
// // Import models
// const User = require('./user.model')(sequelize);
// const RefreshToken = require('./refresh-token.model')(sequelize);
//
//
//
// // Define associations
// User.hasMany(RefreshToken, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// RefreshToken.belongsTo(User, { foreignKey: 'user_id' });
//
// const db = {
//   sequelize,
//   Sequelize,
//   User,
//   RefreshToken
// };
//
// module.exports = db;







const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// eslint-disable-next-line no-undef
const basename = path.basename(__filename);
const config = require('../../shared/database/config')[process.env.NODE_ENV || 'development'];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Load all models
fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
