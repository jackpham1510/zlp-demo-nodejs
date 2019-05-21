const Sequelize = require('sequelize');
const config = require('../config.json');

const sequelize = new Sequelize(config.db.connstring, {
  logging: false,
  define: {
    timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('[DB] connect database success');
  })
  .catch(err => {
    console.error('[DB] Unable to connect to the database:', err);
  });

module.exports = sequelize;