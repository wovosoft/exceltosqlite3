const { readexcel } = require("./src/readexcel");
const { processDatabase } = require("./src/processDatabase");
let colors = require('colors/safe');
const fs = require("fs");

const dialog = require('node-file-dialog');



function init(configFile) {
	const { config } = require(configFile);
	console.log(colors.bgRed("SELECT EXCEL FILE"));
	console.log(colors.blue("Openinig File Dialog..."));
	setTimeout(() => {
		dialog({ type: 'open-file' }).then(excelFile => {
			let rows = readexcel(excelFile[0].trim(), config.sheetName);
			console.log(colors.green("\nShowing First Row for Reference....\n"));
			console.table(rows[0]);
			console.log(colors.bgRed("CREATE or SELECT Database File"));
			console.log(colors.blue("Openinig File Dialog..."));
			setTimeout(() => {
				dialog({ type: 'save-file' }).then(dbFile => {
					dbFile = dbFile[0].trim();
					if (!fs.existsSync(dbFile)) {
						fs.open(dbFile, 'w', function (err, file) {
							if (err) throw err;
							console.log('Database File Created!');
							fs.close(file);
							processDatabase(dbFile, rows, config);
						});
					} else {
						fs.writeFile(dbFile, '', function () {
							console.log(colors.green("DATABASE FILE SWAPED."))
							processDatabase(dbFile, rows, config);
						});
					}
				});
			}, 500);
		});
	}, 500);
}


console.log(colors.bgRed("SELECT Config File First"));
setTimeout(() => {
	dialog({ type: 'open-file' }).then(configFile => {
		init(configFile[0].trim());
	});
}, 500);

