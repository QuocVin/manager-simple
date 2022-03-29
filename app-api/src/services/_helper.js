const { models } = require("../models");

exports.getColumns = (tableName, isCreate = true) => {
  let ret;
  const model = models[tableName];
  if (model) {
    ret = isCreate ? model[0] : model[1];
  } else if (tableName === "token") {
    ret = ["user_id", "token"];
  }

  return ret || [];
};
