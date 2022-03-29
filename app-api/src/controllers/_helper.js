const {parse2Str, MOMENT_DATE} = require("../utils/date")

exports.createResponse = (res, secondary, success = true) => {
  if (success) {
    return res.json({
      code: "Success",
      data: secondary,
      date_time: parse2Str(new Date(), MOMENT_DATE.YYYY_MM_DD_HH_MM_SS)
    });
  } else {
    console.error(secondary)
    return res.json({
      code: "Error",
      error: secondary.toString(),
      date_time: parse2Str(new Date(), MOMENT_DATE.YYYY_MM_DD_HH_MM_SS)
    });
  }
}