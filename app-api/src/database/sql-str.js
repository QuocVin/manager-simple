const _ = require("lodash");
const { MOMENT_DATE, parse2Str } = require("../utils/date");

exports.genSqlAll = ({ tableName }) => {

  return `
    SELECT *
    FROM [${tableName}]
  `;
};

exports.genSqlDetail = ({ tableName, where }) => {
  return `
    SELECT *
    FROM ${tableName}
    ${where}
  `;
};

exports.genSqlInsert = ({ tableName, columns, rows }) => {
  const values = rows
    .map(
      (row) =>
        `(${columns
          .map((col) => (!_.isNil(row[col]) ? `'${row[col]}'` : "NULL"))
          .join(",")})`
    )
    .join(",");
  return `
    INSERT INTO ${tableName} (${columns.join(",")})
    VALUES ${values}
  `;
};

exports.genSqlUpdate = ({ tableName, row }) => {
  const values = Object.keys(row)
    .map((col) => `${col}=${!_.isNil(row[col]) ? `'${row[col]}'` : null}`)
    .join(",");
  return `
    UPDATE ${tableName}
    SET ${values}
    WHERE id='${row.id}'
  `;
};

exports.genSqlDelete = ({ tableName, id }) => {
  return `
    DELETE FROM ${tableName}
    WHERE id='${id}'
  `;
};
