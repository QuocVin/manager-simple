const { basicAcs } = require("../database");
const { bcryptUtil } = require("../utils");
const { getColumns } = require("./_helper");

exports.allRecords = async (tableName, params) => {
  const ret = await basicAcs.allRecords(tableName, params);

  if (!ret.OK) {
    throw ret.error;
  }

  return ret.data;
};

exports.getAll = async (tableName, params) => {
  const acRet1 = await basicAcs.getAll(tableName, params);

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

exports.insert = async (tableName, params, others, t) => {
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

  const acRet = await basicAcs.insert(
    tableName,
    { columns, rows: preData },
    others,
    t
  );
  if (!acRet.OK) {
    throw acRet.error;
  }

  return acRet.data;
};

exports.update = async (tableName, params, others) => {
  const dataSafe = Array.isArray(params) ? params : [params];
  const preData = [];
  dataSafe.forEach((data, idx) => {
    preData[idx] = {
      row: data,
    };
  });
  const acRet = await basicAcs.update(tableName, preData, others);
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

exports.search = async (tableName, params) => {
  const acRet1 = await basicAcs.search(tableName, params);

  if (!acRet1.OK) {
    throw acRet1.error;
  }

  return {
    rows: acRet1.data,
  };
};
