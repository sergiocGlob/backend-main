const db = require('../config/config'); 
const crypto = require('crypto');

const User = {};

User.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        users
    `;

    return db.manyOrNone(sql);
} 

User.findById = (id, callback) =>{

    const sql =`
        SELECT
            id,
            email,
            name,
            lastname,
            image,
            password,
            session_token
        FROM
            users
        WHERE
            id= $1`;
        
        return db.oneOrNone(sql, id).then(user => {callback(null, user);});

}

User.findByUserId = (id) =>{

    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.password,
        U.session_token,
		json_agg(
			json_build_object(
				'id', R.id,
				'name', R.name,
				'image', R.image,
				'route', R.route)
		) AS roles
    FROM
        users AS U
	INNER JOIN
		user_has_roles AS UHR
	ON
		UHR.id_user = U.id
	INNER JOIN
		roles as R
	ON
		R.id = UHR.id_rol
    WHERE
	    U.id= $1
	GROUP BY
	    U.id
    `
    return db.oneOrNone(sql, id);
}

User.findByEmail = (email) =>{

    const sql = `
    SELECT
        U.id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.password,
        U.session_token,
		json_agg(
			json_build_object(
				'id', R.id,
				'name', R.name,
				'image', R.image,
				'route', R.route)
		) AS roles
    FROM
        users AS U
	INNER JOIN
		user_has_roles AS UHR
	ON
		UHR.id_user = U.id
	INNER JOIN
		roles as R
	ON
		R.id = UHR.id_rol
    WHERE
	    U.email= $1
	GROUP BY
	U.id
    `
    return db.oneOrNone(sql, email);
}

User.create = (user) => {

    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql =`
    INSERT INTO
        users(
            email,
            name,
            lastname,
            image,
            password,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.image,
        user.password,
        new Date(),
        new Date()
    ])
}

User.update = (user) => {

    const sql = `
    UPDATE
        users
    SET
        name = $2,
        lastname = $3,
        image = $4,
        updated_at = $5
    WHERE
        id = $1
    `;

    return db.none(sql, [
        user.id,
        user.name,
        user.lastname,
        user.image,
        new Date()
    ]);
}

User.updateToken = (id, token) => {

    const sql = `
    UPDATE
        users
    SET
        session_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}

User.updateFcm = (id, token) => {

    const sql = `
    UPDATE
        users
    SET
        fcm_token = $2
    WHERE
        id = $1
    `;

    return db.none(sql, [
        id,
        token
    ]);
}




User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if(myPasswordHashed === hash){
        return true;
    } 
    return false
}

module.exports = User;
