const moment = require("moment");

const VN_OFFSET = "+07:00";
const MOMENT_DATE = {
  YYYY_MM_DD: "YYYY-MM-DD",
  YYYY_MM: "YYYY-MM",
  YYYYMMDD: "YYYY/MM/DD",
  YYYYMMDD2: "YYYYMMDD",
  MMDDYYYY: "MM/DD/YYYY",
  DD_MM_YYYY: "DD-MM-YYYY",
  DDMMYYYY: "DD/MM/YYYY",
  DEFAULT: "YYYY-MM-DD HH:mm:ss.SSS",
  YYYYMMDDHHMMSSSSS: "YYYYMMDDHHmmssSSS",
  YYYY_MM_DD_00_00_00: "YYYY-MM-DD 00:00:00.000",
  YYYY_MM_DD_23_59_59: "YYYY-MM-DD 23:59:59.999",
  YYYY: "YYYY",
  YYYY_MM_DD_HH_MM_SS: "YYYY-MM-DD HH:mm:ss",
  YYYY_MM_00: "YYYY-MM-01",
};

module.exports = {
  MOMENT_DATE,
  parse2Str,
  convert2Str,
  addDays,
  addMonths,
}

function parse2Str(date = new Date(), format = MOMENT_DATE.DEFAULT) {
  return moment(date).utcOffset(VN_OFFSET).format(format);
};

function convert2Str(date, inFormat, outFormat) {
  return moment(date, inFormat).utcOffset(VN_OFFSET).format(outFormat);
}


/**
 *
 * @param {*} date: date/string/number
 * @param {*} i:number
 */
function addDays(date, i, format = MOMENT_DATE.YYYY_MM_DD) {
  const currentDate = moment(date);
  const rs = moment(currentDate).add(i, 'days').format(format);
  return rs;
};
function addDays2(date, i) {
  const currentDate = moment(date);
  const rs = moment(currentDate).add(i, 'days');
  return rs;
};

/**
* 
* @param {*} date date / string / number
* @param {*} num integer
*/
function addMonths(date, num) {
  return moment(date).add(num, 'months').format(MOMENT_DATE.YYYY_MM_DD_HH_MM_SS);
}

