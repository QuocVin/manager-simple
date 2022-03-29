const _ = require("lodash");
const { MOMENT_DATE, parse2Str } = require("../utils/date");

// select from where order by
exports.genSqlAllRecords = ({
  tableName,
  orderBy,
  where = "",
  where2,
}) => {
  let orderByCmd = "";
  if (Array.isArray(orderBy)) {
    orderByCmd = orderBy
      .map((o) => {
        const s = o.split(",");
        return `${s[0]} ${s[1]}`;
      })
      .join(",");
  } else if (orderBy) {
    const s = orderBy.split(",");
    orderByCmd = `${s[0]} ${s[1]}`;
  } else {
    orderByCmd = "created_date desc";
  }
  if (orderByCmd) {
    orderByCmd = `ORDER BY ${orderByCmd}`;
  }

  let whereCmd;
  if (where2 && Array.isArray(where2)) {
    if (where2.length > 0) {
      if (where2.length === 1) {
        whereCmd = ` ${where2[0].column} >= '${parse2Str(
          where2[0].value1,
          MOMENT_DATE.YYYY_MM_DD_HH_MM_SS
        )}'`;
      } else if (where2.length === 2) {
        whereCmd = ` ${where2[0].column} BETWEEN  '${parse2Str(
          where2[0].value1,
          MOMENT_DATE.YYYY_MM_DD_00_00_00
        )}' AND '${parse2Str(
          where2[0].value2,
          MOMENT_DATE.YYYY_MM_DD_23_59_59
        )}'`;
      }
    }
  } else if (where && Array.isArray(where)) {
    whereCmd = where
      .map((w) => {
        if (w.in) {
          return `${w.column} IN (${w.value.split(",").map(c => `'${c}'`).join(",")})`;
        } else {
          const val = w.dataType === "number" ? w.value : `'${w.value}'`;
          return `${w.column}=${val}`;
        }
      })
      .join(" AND ");
  }
  if (whereCmd) {
    whereCmd = `WHERE ${whereCmd}`;
  } else {
    whereCmd = "";
  }

  return `
    SELECT *
    FROM [${tableName}]
    ${whereCmd}
    ${orderByCmd}
  `;
};

// select có phân trang
const genSqlAll = ({
  tableName,
  orderBy,
  offset,
  limit,
  where = "",
  where2,
}) => {
  let orderByCmd = "";
  if (Array.isArray(orderBy)) {
    orderByCmd = orderBy
      .map((o) => {
        const s = o.split(",");
        return `${s[0]} ${s[1]}`;
      })
      .join(",");
  } else if (orderBy) {
    const s = orderBy.split(",");
    orderByCmd = `${s[0]} ${s[1]}`;
  } else {
    orderByCmd = "created_date desc";
  }
  if (orderByCmd) {
    orderByCmd = `ORDER BY ${orderByCmd}`;
  }

  let whereCmd;
  if (where2 && Array.isArray(where2)) {
    if (where2.length > 0) {
      if (where2.length === 1) {
        whereCmd = ` ${where2[0].column} >= '${parse2Str(
          where2[0].value1,
          MOMENT_DATE.YYYY_MM_DD_HH_MM_SS
        )}'`;
      } else if (where2.length === 2) {
        whereCmd = ` ${where2[0].column} BETWEEN  '${parse2Str(
          where2[0].value1,
          MOMENT_DATE.YYYY_MM_DD_00_00_00
        )}' AND '${parse2Str(
          where2[0].value2,
          MOMENT_DATE.YYYY_MM_DD_23_59_59
        )}'`;
      }
    }
  } else if (where && Array.isArray(where)) {
    whereCmd = where
      .map((w) => {
        if (w.in) {
          return `${w.column} IN (${w.value.split(",").map(c => `'${c}'`).join(",")})`;
        } else {
          const val = w.dataType === "number" ? w.value : `'${w.value}'`;
          return `${w.column}=${val}`;
        }
      })
      .join(" AND ");
  }
  if (whereCmd) {
    whereCmd = `WHERE ${whereCmd}`;
  } else {
    whereCmd = "";
  }

  return `
    SELECT *
    FROM [${tableName}]
    ${whereCmd}
    ${orderByCmd}
    OFFSET ${offset} ROWS
    FETCH NEXT ${limit} ROWS ONLY;
  `;
};
exports.genSqlAll = genSqlAll;

// count
exports.genSqlTotal = ({ tableName, where, where2 }) => {
  let whereCmd;
  if (where2 && Array.isArray(where2)) {
    if (where2.length > 0) {
      if (where2.length === 1) {
        whereCmd = ` ${where2[0].column} >= '${parse2Str(
          where2[0].value1,
          MOMENT_DATE.YYYY_MM_DD_HH_MM_SS
        )}'`;
      } else if (where2.length === 2) {
        whereCmd = ` ${where2[0].column} BETWEEN  '${parse2Str(
          where2[0].value1,
          MOMENT_DATE.YYYY_MM_DD_00_00_00
        )}' AND '${parse2Str(
          where2[0].value2,
          MOMENT_DATE.YYYY_MM_DD_23_59_59
        )}'`;
      }
    }
  } else if (where && Array.isArray(where)) {
    whereCmd = where
      .map((w) => {
        if (w.in) {
          return `${w.column} IN (${w.value.split(",").map(c => `'${c}'`).join(",")})`;
        } else {
          const val = w.dataType === "number" ? w.value : `'${w.value}'`;
          return `${w.column}=${val}`;
        }
      })
      .join(" AND ");
  }
  if (whereCmd) {
    whereCmd = `WHERE ${whereCmd}`;
  } else {
    whereCmd = "";
  }

  return `
    SELECT COUNT(*) as count
    FROM (
      SELECT DISTINCT *
      FROM [${tableName}]
      ${whereCmd}
    ) A
  `;
};

exports.genSqlDetail = ({ tableName, where }) => {
  return `
    SELECT *
    FROM [${tableName}]
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
    INSERT INTO [${tableName}](${columns.join(",")})
    OUTPUT Inserted.*
    VALUES ${values}
  `;
};

exports.genSqlUpdate = ({ tableName, row }) => {
  const values = Object.keys(row)
    .map((col) => `${col}=${!_.isNil(row[col]) ? `'${row[col]}'` : null}`)
    .join(",");
  return `
    UPDATE [${tableName}]
    SET ${values}
    OUTPUT INSERTED.*
    WHERE id='${row.id}'
  `;
};

exports.genSqlDelete = ({ tableName, id }) => {
  return `
    DELETE FROM [${tableName}]
    WHERE id='${id}'
  `;
};

exports.genSqlSearch = (params) => {
  return genSqlAll(params);
};
