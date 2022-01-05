module.exports = (sequelize, Sequelize) => {
  return sequelize.define("config", {
    name: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.TEXT
    },
    note: {
      type: Sequelize.STRING
    }
  });
};
