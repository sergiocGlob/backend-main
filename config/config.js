const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}


const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});

const databaseConfig = {
    'host': 'laundrybackdb.czobnltzc13r.us-east-1.rds.amazonaws.com',
    // 'host': '127.0.0.1',
    'port': 5432,
    'database': 'laundrybackdb',
    'user': 'postgres',
    'password': 'jmaa2692'
};

const db = pgp(databaseConfig);

module.exports = db; 