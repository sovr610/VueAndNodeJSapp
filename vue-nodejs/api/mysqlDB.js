var mysql = require('mysql');


var DB = {
    mysql_isConnected: false,
    mysql_error: null,
    host: 'localhost',
    user: 'parker',
    password: 'Parkereli1',
    database: 'nodetest',
    con: null
};

/**
 *
 * @param {string} host the host address to connect to the mysql server
 * @param {string} user username to connect to mysql server
 * @param {string} password passwords to connect to mysql server
 * @param {string} database the database to connect too in the mysql server
 */
DB.connect = function(host, user, password, database) {
    var con = null;
    if (database != null) {
        con = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });
    } else {
        con = mysql.createConnection({
            host: host,
            user: user,
            password: password
        });
    }

    con.connect(function(err) {
        if (err) {
            mysql_error = err;
            console.log("error connecting - " + err);
            mysql_isConnected = false;
        } else {
            console.log("connected");
            mysql_isConnected = true;
        }
    });
    DB.con = con;
}

/**
 *
 * @param {object} tableOptions An object that contains the table name and an array of column objects.
 * @param {string} tableOptions.tableName The table Name
 * @param {array} tableOptions.columns the table columns
 * @param {string} tableOptions.columns.name the column name
 * @param {string} tableOptions.columns.type the column type
 * @param {function} result
 * @param {function} rejected
 */
DB.createTable = function(tableOptions, result, rejected) {
    if (DB.mysql_isConnected == false) {
        DB.connect(DB.host, DB.user, DB.password, DB.database);
    }


    var tableName = tableOptions.tableName;
    var columns = '';
    for (var x = 0; x <= tableOptions.columns.length; x++) {
        var column = tableOptions.columns[x];
        columns = columns + column;
    }
    DB.con.query('CREATE TABLE ' + tablName + '(' + columns + ')', function(err, result) {
        if (err) {
            rejected(err);
        } else {
            result(result);
        }
    });
}

/**
 *
 * @param {object} insertOptions the table name, columns and values to insert into
 * @param {string} insertOptions.tableName the table name
 * @param {array} insertOptions.values array of values with column names
 * @param {string} insertOptions.values.columnName the column name
 * @param {string} insertOptions.values.value the value of the column
 * @param {function} result
 * @param {function} rejected
 */
DB.insertIntoTable = function(insertOptions, result, rejected) {
    if (DB.mysql_isConnected == false) {
        DB.connect(DB.host, DB.user, DB.password, DB.database);
    }

    console.log(insertOptions);

    var tableName = insertOptions.tableName;
    var columns = '(';
    var values = '(';
    console.log(insertOptions);
    for (var x = 0; x <= insertOptions.values.length - 1; x++) {
        var columns_values = insertOptions.values[x];
        columns = columns + columns_values.columnName + ',';
        values = values + columns_values.value + ',';
    }

    columns = columns.substring(0, columns.length - 1);
    values = values.substring(0, values.length - 1);
    columns = columns + ')';
    values = values + ')';
    var sql = 'INSERT INTO ' + tableName + ' ' + columns + ' VALUES' + values;
    DB.con.query(sql, function(err, results) {
        if (err) {
            rejected(err);
        } else {
            result(results);
        }
    });
};

/**
 *
 * @param {object} selectOptions contains tableName data
 * @param {string} selectOptions.tableName the tableName to select from
 * @param {function} resolve
 * @param {function} reject
 */
DB.getAllRowsInTable = function(selectOptions, resolve, reject) {
    if (DB.mysql_isConnected == false) {
        DB.connect(DB.host, DB.user, DB.password, DB.database);
    }
    var tableName = selectOptions.tableName;
    var sql = 'SELECT * FROM ' + tableName;
    DB.con.query(sql, function(err, results) {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
}

/**
 *
 * @param {object} selectOptions the tableName and where clause
 * @param {string} selectOptions.tableName the table to select from
 * @param {string} selectOptions.where the where clause
 * @param {function} resolve
 * @param {function} reject
 */
DB.getRowsInTableWithWhere = function(selectOptions, resolve, reject) {
    if (DB.mysql_isConnected == false) {
        DB.connect(DB.host, DB.user, DB.password, DB.database);
    }
    var tableName = selectOptions.tableName;
    var where = selecteOptions.where;
    var sql = 'SELECT * FROM ' + tableName + ' WHERE ' + where;
    con.query(sql, function(err, results) {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
}

/**
 *
 * @param {object} databaseOptions contains databaseName
 * @param {object} databaseOptions.databaseName the name of the database you want to create
 * @param {function} resolve
 * @param {function} reject
 */
DB.createDatabase = function(databaseOptions, resolve, reject) {
    if (DB.mysql_isConnected == false) {
        DB.connect(DB.host, DB.user, DB.password, DB.database);
    }
    var databaseName = databaseOptions.databaseName;
    con.query("CREATE DATABASE " + databaseName, function(err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
}

/**
 *
 * @param {object} updateOptions contains table name, where clause, and array of values to update
 * @param {object} updateOptions.tableName the table name
 * @param {object} updateOptions.where the where clause condition
 * @param {array} updateOptions.values contains the array of columnName and value
 * @param {object}
 * @param {function} resolve
 * @param {function} reject
 */
DB.updateTable = function(updateOptions, resolve, reject) {
    if (DB.mysql_isConnected == false) {
        DB.connect(DB.host, DB.user, DB.password, DB.database);
    }
    var dataTable = updateOptions.tableName;
    var where = updateOptions.where;
    var values;
    for (var x = 0; x < updateOptions.values; x++) {
        var val = updateOptions.values[x];
        values = values + ' ' + val.column + '=\'' + val.value + '\',';
    }

    values = values.substring(0, values.length - 1);

    var sql = 'UPDATE ' + dataTable + ' SET ' + values + ' WHERE ' + where;
    con.query(sql, function(err, results) {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
}

/**
 *
 * @param {string} query sql query
 * @param {function} resolve
 * @param {function} reject
 */
DB.customQuery = function(query, resolve, reject) {
    if (DB.mysql_isConnected == false) {
        DB.connect(DB.host, DB.user, DB.password, DB.database);
    }
    con.query(query, function(err, results) {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
}

/**
 *
 * @param {object} storedProcedure contains storedProcedureName and values as [] array
 * @param {array} storedProcedure.values contains the values for the stored procedure as []
 * @param {function} rsolve
 * @param {function} reject
 */
DB.callStoredProcedure = function(storedProcedure, rsolve, reject) {
    if (DB.mysql_isConnected == false) {
        DB.connect(DB.host, DB.user, DB.password, DB.database);
    }
    var storedProcedureName = storedProcedure.storedProcedureName;
    var values = storedProcedures.values;
    con.query('CALL ' + storedProcedureName + '(?)', values, function(err, results) {
        if (err) {
            reject(err);
        } else {
            resolve(results);
        }
    });
};

module.exports = DB;