const { Sequelize, QueryTypes } = require("sequelize");

const config = {
  username: "root",
  password: "123456",
  database: "app_test",
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
  timezone: "+07:00",
  underscored: true,
  dialectOptions: {
    useUTC: true,
    dateStrings: true,
    typeCast: true,
  },
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  pool: {
    max: 50,
    min: 0,
    idle: 10000,
    acquire: 60000,
    evict: 10000,
    connectTimeout: 1000000,
    handleDisconnects: false,
  },
};

const db = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

function createResult(data, error = false) {
  if (error) {
    console.error(error);

    return {
      OK: false,
      error,
    };
  } else {
    return {
      OK: true,
      data: data,
    };
  }
}

function createPaginate(page, pageSize) {
  let offset = 0;
  let limit = 20;
  let pageNumber = 1;
  let pageSizeNumber = 20;

  if (page) {
    pageNumber = parseInt(page);
    if (!pageNumber || pageNumber < 1) {
      pageNumber = 1;
    }
  }
  if (pageSize) {
    pageSizeNumber = parseInt(pageSize);
    if (!pageSizeNumber || pageSizeNumber < 1) {
      pageSizeNumber = 20;
    }
  }

  offset = (pageNumber - 1) * pageSizeNumber;
  limit = pageSizeNumber;

  return {
    offset,
    limit,
  };
}

module.exports = {
  db,
  Sequelize,
  QueryTypes,
  createResult,
  createPaginate,
};
