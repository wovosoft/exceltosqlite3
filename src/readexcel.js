const XLSX = require('xlsx');
exports.readexcel = function (filename, sheet = "Sheet1", options = { type: 'array' }) {
    let workbook = XLSX.readFile(filename, options);
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
}
