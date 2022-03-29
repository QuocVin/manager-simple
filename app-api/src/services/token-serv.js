const _ = require("lodash");
const { basicAcs } = require("../database");
const { jwtUtil } = require("../utils");

exports.getToken = async (user) => {
  const usr = JSON.parse(JSON.stringify(user));
  delete usr["password"];
  const ret = await jwtUtil.generateToken(usr);

  let tokenRet = await basicAcs.detail('token', { user_id: user.id });
  if (tokenRet.OK && !_.isEmpty(tokenRet.data)) {
    const newData = {
      ...tokenRet.data,
      token: ret,
    };
    await basicAcs.update('token', { columns: ["token"], row: newData });
  } else {
    const rows = { user_id: user.id, token: ret };
    await basicAcs.insert('token', { columns: ["id", "user_id", "token"], rows });
  }

  return ret;
};
