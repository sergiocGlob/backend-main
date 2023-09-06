const db = require('../config/config');


const Esp8266 = {};

Esp8266.create = (esp8266) => {
    const sql = `
    
    INSERT INTO
        esp8266(
            id,
            ssid,
            password,
            gpio0,
            gpio1,
            id_machine,
            created_at,
            updated_at
        )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
    
    `;
    return db.oneOrNone(sql, [
        esp8266.id,
        esp8266.ssid,
        esp8266.password,
        esp8266.gpio0,
        esp8266.gpio1,
        esp8266.id_machine,
        new Date(),
        new Date()
    ])
}

Esp8266.dataReading = (dataReading) => {
    const sql = `
    
    INSERT INTO
        data_reading(
            id,
            voltage,
            ampers,
            potency,
            created_at,
            updated_at
        )
        VALUES($1, $2, $3, $4, $5, $6) RETURNING id
    
    `;
    return db.oneOrNone(sql, [
        dataReading.id,
        dataReading.voltage,
        dataReading.ampers,
        dataReading.potency,
        new Date(),
        new Date()
    ])
}

Esp8266.getUsersFcm = () =>{

    const sql = `
        SELECT
            fcm_token
        FROM
            users
    
    `;

    return db.manyOrNone(sql);
}

Esp8266.getMachineIdByEspId = (id) =>{
    const sql = `
        SELECT
            id_machine
        FROM
            esp8266
        WHERE
            id = $1
    `;

    return db.oneOrNone(sql,id);
}


Esp8266.getMachineByEspId = (id) =>{

    const sql = `
        SELECT
            *
        FROM
            machines
        WHERE
            id = $1
    `;

    return db.oneOrNone(sql,id);
}

Esp8266.error = (error) => {
    const sql = `
    
    INSERT INTO
        error(
            voltage,
            ampers,
            potency,
            id_esp,
            alert,
            created_at,
            updated_at
        )
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    
    `;
    return db.oneOrNone(sql, [
        error.voltage,
        error.ampers,
        error.potency,
        error.id_esp,
        error.alert,
        new Date(),
        new Date()
    ])
}


Esp8266.findByMachine = (id_machine) =>{
    
    console.log('que esta llegando: ', id_machine);

    const sql = `
        SELECT
            id,
            gpio0,
            id_machine
        FROM
            esp8266
        WHERE
            id_machine = $1
    
    `;

    return db.oneOrNone(sql, id_machine);
        
}

Esp8266.findByIdEsp8266 = (id) => {

    const sql = `
        SELECT
            id,
            gpio0,
            gpio1
        FROM
            esp8266
        WHERE
            id = $1

    `;

    return db.oneOrNone(sql, id);
}

Esp8266.update = (id, gpio0, updated_at) => {

    const sql = `
        UPDATE
            esp8266
        SET
            gpio0 = $2,
            updated_at = $3
        WHERE
            id = $1
    `;

    return db.none(sql,[
        id,
        gpio0,
        new Date()
    ])

}


Esp8266.findByIdData = (id) => {

    const sql = `
        SELECT
            id,
            voltage,
            ampers,
            potency,
            created_at
        FROM
            data_reading
        WHERE
            id = $1

    `;

    return db.manyOrNone(sql, id);
}

Esp8266.getAllErrors = () => {

    const sql = `
        select error.id, error.voltage, error.ampers, error.potency, error.id_esp , esp8266.id_machine,
        machines.name, error.alert, error.created_at

        
        from 
        error
        inner join 
        esp8266 ON error.id_esp = esp8266.id
        inner join
        machines on esp8266.id_machine = machines.id
        order by error.created_at DESC

    `;

    return db.manyOrNone(sql);
}




module.exports = Esp8266;
