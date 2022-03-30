const { API_METHOD } = require("./_helper");

exports.APIS = [
  { protected: false, name: "getAll", path: "getAll", method: API_METHOD.GET },
  { protected: false, name: "insert", path: "insert", method: API_METHOD.POST },
  { protected: false, name: "update", path: "update", method: API_METHOD.PUT },
  { protected: false, name: "remove", path: "remove", method: API_METHOD.DELETE, },
  { protected: false, name: "detail", path: "detail", method: API_METHOD.GET },
];
