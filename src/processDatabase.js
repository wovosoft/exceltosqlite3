let colors = require('colors/safe');
exports.processDatabase = function (dbFile,rows = [],config) {
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connected.');
    });
   
    db.serialize(() => {
        let cols = config.columns.join(",");
        db.run(`CREATE TABLE ${config.tableName}(${cols})`);
        console.log(`${config.tableName} table created`);
        for (let x in rows) {
            db.run(
                `INSERT INTO ${config.tableName}(${config.insert.columns.join(",")}) ` +
                `VALUES(${config.insert.columns.map(i => '$' + i).join(",")})`, config.insert.values(rows[x])
            );
            config.insert.success(rows[x]);
        }
        console.log(colors.bgGreen("\nExported : "+rows.length + " items.\n"));
        console.log(colors.bgBlue("THANK YOU"));
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed.');
    });
}