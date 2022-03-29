const { userServ } = require("../services");
const { createResponse } = require("./_helper");

exports.createUser = async (req, res) => {
  try {
    const others = { auth: req.jwtDecoded }
    const ret = await userServ.createUser(req.body, others);

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
}

exports.chartRole = async (req, res) => {
  try {
    const ret = await userServ.chartRole();

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
}

exports.searchName = async (req, res) => {
  try {
    const ret = await userServ.searchName(req.body);

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
}