const db = require('../config/config');


const City = {};

City.getAll = () => {

    const sql = `
        SELECT
            id,
            name,
            department
        FROM
            cities
        ORDER BY
            name
    
    `;

    return db.manyOrNone(sql);
}


City.create = (city) => {
    const sql = `
    
    INSERT INTO
        cities(
            name,
            department,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4) RETURNING id   
    
    `;
    return db.oneOrNone(sql, [
        city.name,
        city.department,
        new Date(),
        new Date()
    ])
}


module.exports = City;