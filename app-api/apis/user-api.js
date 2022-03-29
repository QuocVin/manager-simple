const { API_METHOD } = require("./_helper");

exports.APIS = [
  { protected: false, name: "createUser", path: "createUser", method: API_METHOD.POST },
  { protected: false, name: "chartRole", path: "chartRole", method: API_METHOD.GET },
  { protected: false, name: "searchName", path: "searchName", method: API_METHOD.POST },
];
