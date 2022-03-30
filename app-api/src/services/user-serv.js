const _ = require("lodash");
const { basicAcs } = require("../database");
const { bcryptUtil } = require("../utils");
const basicServ = require("./basic-serv");
const {
  QueryTypes,
  db,
  createResult,
} = require("../database/db-access");

module.exports = {
  getUserByAuth,
  createUser,
  chartRole,
  searchName,
}

async function getUserByAuth(username, password) {
  let error;
  const userRet = await basicAcs.detail('users', { username });
  if (userRet.OK && !_.isEmpty(userRet.data)) {
    const user = userRet.data;
    const isMath = await bcryptUtil.compare(password, user.password);
    if (password === user.password || isMath) {
      delete user["password"];
      return {
        data: user,
      };
    } else {
      error = "Please check password.";
    }
  } else {
    error = `Not found user with username: ${username}.`;
  }

  return {
    error,
  };
};

async function createUser(params) {
  if (_.isEmpty(params)) {
    return []
  }

  const safeRecs = Array.isArray(params) ? params : [params]
  const prs = safeRecs.map(rec => {
    return {
      ...rec,
    }
  });

  await basicServ.insert("users", prs)
  return prs
}

async function chartRole() {

  try {
    const sql = `
    SELECT COUNT(id) as sl
    FROM users
    GROUP BY role_name
    ORDER BY role_name
  `;
    const ret = await db.query(sql, { type: QueryTypes.SELECT });

    let arr = [];
    ret.map((r) => {
      arr.push(r.sl)
    })

    return createResult(arr);
  } catch (ex) {
    return createResult(null, ex);
  }
}

async function searchName(params) {
  if (_.isEmpty(params)) {
    return []
  }

  const safeRecs = Array.isArray(params) ? params : [params]
  const prs = safeRecs.map(rec => {
    return {
      ...rec,
    }
  });

  try {
    const sql = `
    SELECT *
    FROM users
    WHERE name like '%${prs[0].name}%' AND role_name != 'ADMIN'
    ORDER BY name
  `;
    const ret = await db.query(sql, { type: QueryTypes.SELECT });

    return createResult(ret);
  } catch (ex) {
    return createResult(null, ex);
  }
}