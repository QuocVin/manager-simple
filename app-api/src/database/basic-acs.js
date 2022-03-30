const _ = require("lodash");
const {
  QueryTypes,
  db,
  createResult,
  createPaginate,
} = require("./db-access");
const sqlStr = require("./sql-str");
const { parse2Str } = require("../utils/date");
const { v4: uuid } = require("uuid");

exports.getAll = async (tableName) => {
  try {
    const sql = sqlStr.genSqlAll({ tableName });
    const ret = await db.query(sql, { type: QueryTypes.SELECT });

    return createResult(ret);
  } catch (ex) {
    return createResult(null, ex);
  }
};

exports.detail = async (tableName, params) => {
  try {
    if (_.isEmpty(params)) {
      return createResult({});
    }

    let wherCmd = _.keys(params)
      .map((p) => `${p}='${params[p]}'`)
      .join(" AND ");
    if (!_.isEmpty(wherCmd)) {
      wherCmd = `WHERE ${wherCmd}`;
    }

    const sql = sqlStr.genSqlDetail({
      tableName,
      where: wherCmd,
    });

    const many = await db.query(sql, { type: QueryTypes.SELECT });
    const ret = _.get(many, [0], {});

    return createResult(ret);
  } catch (ex) {
    return createResult(null, ex);
  }
};

exports.insert = async (tableName, { columns, rows }) => {
  try {
    let rowsSafe = Array.isArray(rows) ? rows : [rows];
    rowsSafe = rowsSafe.map((r) => {
      return {
        ...r,
        id: uuid(),
      };
    });

    const sql = sqlStr.genSqlInsert({
      tableName,
      columns,
      rows: rowsSafe,
    });

    const ret = await db.query(sql, { type: QueryTypes.INSERT });

    return createResult(ret);
  } catch (ex) {
    return createResult(null, ex);
  }
};

exports.update = async (tableName, params) => {
  try {
    const dataSafe = Array.isArray(params) ? params : [params];
    const sql = dataSafe.map(({ row }) => {
      const data = {
        ...row,
      };
      return sqlStr.genSqlUpdate({
        tableName,
        row: data,
      });
    }).join(';');
    const many = await db.query(sql, { type: QueryTypes.UPDATE });

    return createResult(many);
  } catch (ex) {
    return createResult(null, ex);
  }
};

exports.remove = async (tableName, { id }, t) => {
  try {
    const sql = sqlStr.genSqlDelete({
      tableName,
      id,
    });
    await db.query(sql, { type: QueryTypes.DELETE, transaction: t });

    return createResult({ id });
  } catch (ex) {
    return createResult(null, ex);
  }
};
