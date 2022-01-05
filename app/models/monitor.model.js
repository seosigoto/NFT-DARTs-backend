module.exports = (sequelize, Sequelize) => {
  return sequelize.define("monitor", {
    name: {
      type: Sequelize.STRING
    },
    ip: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    block_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    last_blocktime: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    is_banned: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
};
