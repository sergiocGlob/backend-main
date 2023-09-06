// const db = require('../config/config');


// const Edificio = {};

// Edificio.getAll = () => {

//     const sql = `
//         SELECT
//             id,
//             name,
//             description
//         FROM
//             edificios
//         ORDER BY
//             name
    
//     `;

//     return db.manyOrNone(sql);
// }


// Edificio.create = (edificio) => {
//     const sql = `
    
//     INSERT INTO
//         edificios(
//             name,
//             description,
//             created_at,
//             updated_at
//         )
//     VALUES($1, $2, $3, $4) RETURNING id   
    
//     `;
//     return db.oneOrNone(sql, [
//         edificio.name,
//         edificio.description,
//         new Date(),
//         new Date()
//     ])
// }


// module.exports = Edificio;