const db = require('../config/config');

const Address = {};


Address.getAll = () => {

    const sql = `
        SELECT
            id,
            id_city,
            name,
            address,
            neighborhood,
            lat,
            lng
        FROM
            address
        ORDER BY
            name
    
    `;

    return db.manyOrNone(sql);
}

Address.findByCity = (id_city) =>{
    const sql = `
    SELECT 
        id,
        name,
        id_city,
        address,
        neighborhood,
        lat,
        lng
    FROM 
        address
    WHERE
        id_city = $1
    `;

    return db.manyOrNone(sql, id_city);
}



Address.create = (address) => {
    const sql = `
    INSERT INTO
        address(
            id_city,
            name,
            address,
            neighborhood,
            lat,
            lng,
            created_at,
            updated_at
        )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id
    `;

    return db.oneOrNone(sql,[
        address.id_city,
        address.name,
        address.address,
        address.neighborhood,
        address.lat,
        address.lng,
        new Date(),
        new Date
    ])
}

module.exports = Address;