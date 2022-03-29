const { basicServ } = require("../services");
const { createResponse } = require("./_helper");
const _ = require("lodash");

exports.allRecords = async (req, res) => {
  try {
    const tableName = req.baseUrl.replace("/api/", "");
    const ret = await basicServ.allRecords(tableName, req.query);

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
};

exports.getAll = async (req, res) => {
  try {
    const tableName = req.baseUrl.replace("/api/", "");
    const ret = await basicServ.getAll(tableName, req.query);

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
};

exports.detail = async (req, res) => {
  try {
    const tableName = req.baseUrl.replace("/api/", "");
    const ret = await basicServ.detail(tableName, req.query, {
      auth: req.jwtDecoded,
    });

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
};

exports.insert = async (req, res) => {
  try {
    const tableName = req.baseUrl.replace("/api/", "");
    const others = { auth: req.jwtDecoded }
    const ret = await basicServ.insert(tableName, req.body, others);

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
};

exports.update = async (req, res) => {
  try {
    const tableName = req.baseUrl.replace("/api/", "");
    const others = { auth: req.jwtDecoded }
    const ret = await basicServ.update(tableName, req.body, others);

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
};

exports.remove = async (req, res) => {
  try {
    const tableName = req.baseUrl.replace("/api/", "");
    const others = { auth: req.jwtDecoded }
    const ret = await basicServ.remove(tableName, req.body, others);

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
};

exports.search = async (req, res) => {
  try {
    const tableName = req.baseUrl.replace("/api/", "");
    const ret = await basicServ.search(tableName, req.body);

    return createResponse(res, ret);
  } catch (ex) {
    return createResponse(res, ex, false);
  }
};
