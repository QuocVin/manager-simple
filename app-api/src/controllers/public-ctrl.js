const { userServ, tokenServ } = require("../services");
const { createResponse } = require("./_helper");

exports.authenticate = async (req, res) => {
  try {
    const userRet = await userServ.getUserByAuth(
      req.body.username,
      req.body.password
    );
    if (userRet.error) {
      return createResponse(res, userRet.error, false);
    }
    const user = userRet.data;

    // update latest login
    const profile = user;
    delete profile.password;

    let token = await tokenServ.getToken(profile);
    ret = {
      profile: {
        ...profile,
      },
      auth: {
        access_token: token,
      },
    };

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
};
