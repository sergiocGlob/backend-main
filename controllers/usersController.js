const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { json } = require('express');
//const storage  = require('../utils/cloud_storage');


module.exports = {


    /// update user fcm token
    async fcmUpdate(req,res,next){
        try{
            const id = req.body.id;
            const fcm = req.body.fcm;
            await User.updateFcm(id,fcm);
            return res.status(201).json({
                success:true,
                message:'La sesion cerro Correctamente!'
            });
        }catch(e){
            console.log(`Error: ${error}`);
            return res.status.json({
                success: false,
                message: 'Error amigo'
            });
        }
    },


    async getAll(req, res, next){
        try{
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status.json({
                success: false,
                message: 'Error al obtener los usuarios'
            });

        }
    },

    async findById(req, res, next){
        try{
            const id = req.params.id;
        
            const data = await User.findByUserId(id);
            console.log(`Usuario: ${data}`);
            return res.status(201).json(data);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status.json({
                success: false,
                message: 'Error al obtener el usuario por ID'
            });

        }
    },

    async register(req, res, next){
        try {
            const user = req.body;
            const data = await User.create(user);

            await Rol.create(data.id, 1);

            return res.status(201).json({
                success: true,
                message: 'El registro fue exitoso, Ahora inicia sesion',
                data: data.id
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                messege: 'Hubo un error en el registro',
                error: error
            });
            
        }
    },

    async registerWithImage(req, res, next){
        try {
            const user = JSON.parse(req.body.user);
            console.log(`Datos usuario: ${user}`);

            const files = req.files;

            if(files.length > 0){
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null){
                    user.image = url;

                }
            }

            const data = await User.create(user);

            await Rol.create(data.id, 1);

            return res.status(201).json({
                success: true,
                message: 'El registro fue exitoso, Ahora inicia sesion',
                data: data.id
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                messege: 'Hubo un error en el registro',
                error: error
            });
            
        }
    },

    async update(req, res, next){
        try {
            const user = JSON.parse(req.body.user);
            console.log(`Datos usuario: ${user}`);

            const files = req.files;

            if(files.length > 0){
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null){
                    user.image = url;

                }
            }

            await User.update(user);

            return res.status(201).json({
                success: true,
                message: 'El registro fue actualizado'
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                messege: 'Hubo un error en actualizacion de registro',
                error: error
            });
            
        }
    },



    async login(req,res, next){
        try{

            const email = req.body.email;
            const password = req.body.password;
            const myUser = await User.findByEmail(email);

            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            if(User.isPasswordMatched(password, myUser.password)){
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
                    expiresIn: (60 * 60 * 500)//prueba de 2 minutos token
                });
                const data = {
                    id : myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email : myUser.email,
                    image : myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                await User.updateToken(myUser.id, `JWT ${token}`);

                console.log(`Usuario enviado ${data}`)

                return res.status(201).json({
                    success:true,
                    data: data,
                    message:'El usuario ha sido autenticado'
                });
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                })
            }

        }catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento del Login',
                error:error
            });
        }

    },
    async logout(req,res, next){
        try{
            const id = req.body.id;
            await User.updateToken(id,null);
            return res.status(201).json({
                success:true,
                message:'La sesion cerro Correctamente!'
            });

        }
        catch(e){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de logout',
                error:error
            });
        
    }

 } 


};