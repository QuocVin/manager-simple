const _ = require("lodash");
const auth = require("basic-auth");
const { jwtUtil, dateUtil } = require("../src/utils");
const { userServ } = require("../src/services");

function createPublicAuth(req, res, next) {
  return next();
}

async function createProtectedAuth(req, res, next) {
  try {
    /// case 1. check basic auth
    const credentials = auth(req);
    if (credentials) {
      const userRet = await userServ.getUserByAuth(
        credentials.name,
        credentials.pass
      );
      if (userRet.error) {
        return handleUnauthorized(res, userRet.error);
      }
      // Access granted
      req.jwtDecoded = userRet.data;
      console.info(
        `Accessed Account: [${credentials.name}] [${dateUtil.parse2Str()}]`
      );

      return next();
    }

    /// case 2. Check token
    const BEARER = "Bearer ";
    const bearerToken = _.get(req, ["headers", "authorization"], null);
    if (bearerToken && bearerToken.includes(BEARER)) {
      const token = bearerToken.replace(BEARER, "");
      const user = await jwtUtil.verifyToken(token);
      // check with db
      // const tokenRet = await getTokenByUserId(user.id);
      // if (tokenRet.OK) {
      req.jwtDecoded = user;

      return next();
      // }
    }

    return handleUnauthorized(res);
  } catch (ex) {
    return handleUnauthorized(res, ex);
  }
}

function handleUnauthorized(res, message) {
  const err = new Error(message || "Unauthorized");
  return res.status(401).send({
    code: "401",
    message: err.message,
  });
}
function handleForbidden(res, message) {
  const err = new Error(message || "Forbidden");
  return res.status(403).send({
    code: "403",
    message: err.message,
  });
}

module.exports = {
  createPublicAuth,
  createProtectedAuth,
};
