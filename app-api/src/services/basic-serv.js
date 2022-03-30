const { basicAcs } = require("../database");
const { bcryptUtil } = require("../utils");
const { getColumns } = require("./_helper");

exports.getAll = async (tableName, params) => {
  const acRet1 = await basicAcs.getAll(tableName);

  if (!acRet1.OK) {
    throw acRet1.error;
  }

  return {
    rows: acRet1.data,
  };
};

exports.detail = async (tableName, params) => {
  const acRet = await basicAcs.detail(tableName, params);
  if (acRet.OK) {
    return acRet.data;
  }
  throw acRet.error;
};

exports.insert = async (tableName, params) => {
  const columns = getColumns(tableName);
  let preData;
  if (tableName === "users") {
    const dataSafe = Array.isArray(params) ? params : [params];
    const arrPass = await Promise.all([
      ...dataSafe.map((p) => bcryptUtil.generateHash(p.password, p.username)),
    ]);
    preData = dataSafe.map((p) => {
      const find = arrPass.find((itm) => itm.key === p.username);
      return {
        ...p,
        password: find.hash,
      };
    });
  } else {
    preData = params;
  }

  const acRet = await basicAcs.insert(tableName, { columns, rows: preData },);
  if (!acRet.OK) {
    throw acRet.error;
  }

  return acRet.data;
};

exports.update = async (tableName, params) => {
  const dataSafe = Array.isArray(params) ? params : [params];
  const preData = [];
  dataSafe.forEach((data, idx) => {
    preData[idx] = {
      row: data,
    };
  });
  const acRet = await basicAcs.update(tableName, preData);
  if (acRet.OK) {
    return acRet.data;
  }
  throw acRet.error;
};

exports.remove = async (tableName, id, t) => {
  const acRet = await basicAcs.remove(tableName, id, t);
  if (acRet.OK) {
    return acRet.data;
  }
  throw acRet.error;
};
