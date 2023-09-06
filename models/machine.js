const db = require ('../config/config');

const Machine = {};

Machine.findByCategory = (id_category) => {
    const sql =`
        
    
        SELECT
        M.id,
        M.name,
        M.description,
        M.serial,
        M.model,
        M.id_lavanti,
        M.voltaje,
        M.corriente,
        M.potencia,
        M.image1,
        M.image2,
        M.id_category,
        M.id_address
    FROM
        machines AS M
    INNER JOIN
        categories AS C
    ON
        M.id_category = C.id
    WHERE
        C.id = $1
    
    `;

    return db.manyOrNone(sql, id_category);


}


Machine.create = (machine) => {

    const sql = `
    INSERT INTO
        machines(
            name,
            description,
            serial,
            model,
            id_lavanti, 
            voltaje,
            corriente,
            potencia,
            image1,
            image2,
            id_category,
            id_address,
            created_at,
            updated_at
        )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id
    
    `;

    return db.oneOrNone(sql, [
           machine.name,
           machine.description,
           machine.serial,
           machine.model,
           machine.id_lavanti,
           machine.voltaje,
           machine.corriente,
           machine.potencia,
           machine.image1,
           machine.image2,
           machine.id_category,
           machine.id_address,
           new Date(),
           new Date()
    ]);
}

Machine.update = (machine)=>{

    const sql=`
    UPDATE
        machines
    SET
        name = $2,
        description = $3,
        serial = $4,
        model = $5,
        id_lavanti = $6,
        corriente = $7,
        voltaje= $8,
        potencia = $9,
        image1 = $10,
        image2 = $11,
        id_category= $12,
        id_address=$13,
        updated_at = $14
    WHERE 
        id = $1

    `;
    return db.none(sql,[
        machine.id,
        machine.name,
        machine.description,
        machine.serial,
        machine.model,
        machine.id_lavanti,
        machine.corriente,
        machine.voltaje,
        machine.potencia,
        machine.image1,
        machine.image2,
        machine.id_category,
        machine.id_address,
        new Date ()
    ]);
}

Machine.findByBuilding = (id_address) => {
    const sql =`
        
        SELECT
        M.id,
        M.name,
        M.description,
        M.serial,
        M.model,
        M.id_lavanti,
        M.voltaje,
        M.corriente,
        M.potencia,
        M.image1,
        M.image2,
        M.id_category,
        M.id_address
    FROM
        machines AS M
    INNER JOIN
        address AS A
    ON
        M.id_address = A.id
    WHERE
        A.id = $1
    
    `;

    return db.manyOrNone(sql, id_address);


}




module.exports = Machine;