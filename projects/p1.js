const fs = require("fs");
let colors = require('colors/safe');
let increment = 1;
let count = 1;
exports.config = {
    tableName: "employees",
    // excelFile: "./test2.xlsx",
    // dbFile: "./db.sqlite",
    sheetName: 'Sheet1',
    columns: [
        "sl int",
        "branch char",
        "name char",
        "designation char",
        "pf_id char",
        "dob char",
        "joining char",
        "blood_group char",
        "nid char",
        "mobile char",
        "emergency_contact char",
        "image blob"
    ],
    insert: {
        columns: [
            "sl",
            "branch",
            "name",
            "designation",
            "pf_id",
            "dob",
            "joining",
            "blood_group",
            "nid",
            "mobile",
            "emergency_contact",
            "image"
        ],
        values: function (row) {
            return {
                "$sl": increment++,
                "$branch": row.branch,
                "$name": row.name,
                "$designation": row.designation,
                "$pf_id": row.pf_id,
                "$dob": row.dob,
                "$joining": row.joining,
                "$blood_group": row.blood_group,
                "$nid": row.nid,
                "$mobile": row.mobile,
                "$emergency_contact": row.emergency_contact,
                "$image": fs.readFileSync("./img/" + (row.sl < 10 ? "0" + row.sl : row.sl) + ".jpg")
            }
        },
        success: function (item) {
            console.log(count++ + ". " + colors.green(item.name) + " inserted successfully");
        }
    }
}