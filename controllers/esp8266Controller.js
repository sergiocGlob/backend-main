const Esp8266 = require('../models/esp8266');
const keys = require('../config/keys');
const { update, dataReading, findByIdData } = require('../models/esp8266');
//const admin = require("firebase-admin");
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

module.exports = {

    async findByIdData(req, res, next){
        try{
            const id = req.params.id;
            const esp = await Esp8266.findByIdData(id);
        
            console.log(`Usuario: ${JSON.stringify(esp)}`);
            return res.status(200).json(esp);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status.json({
                success: false,
                message: 'Error al obtener el usuario por ID',
                error: error
            });

        }
    },



    async findById(req, res, next){
        try{
            console.log(req.body);
            const id = req.params.id;
            const esp = await Esp8266.findByIdEsp8266(id);
        
            console.log(`Usuario: ${JSON.stringify(esp)}`);
            return res.status(200).json(esp);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status.json({
                success: false,
                message: 'Error al obtener el usuario por ID',
                error: error
            });

        }
    },


    async findByMachineEsp(req, res, next){
        try{
            console.log('de aqui para adelante error');
            const id_machine = req.params.id;
            const esp = await Esp8266.findByMachine(id_machine);
        
            console.log(`Usuario: ${esp}`);
            return res.status(201).json(esp);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status.json({
                success: false,
                message: 'Error al obtener el usuario por ID',
                error: error
            });

        }
    },

    async update(req, res){
        try {
            console.log(req.body);
            const id = req.body['id'];
            const gpio0 = req.body['gpio0'];
            const updated_at = req.body['updated_at'];
            console.log(`Datos usuario: ${id}`);
            console.log(`Datos usuario: ${gpio0}`);
            console.log(`Datos usuario: ${updated_at}`);

            await Esp8266.update(id,gpio0,updated_at);

            return res.status(200).json({
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

    async create(req, res, next){
        
        try {
            const id = req.body;
            console.log(`Ciudad enviada: ${id}`);
            const data = await Esp8266.create(id);
            return res.status(201).json({
                message : 'El Modulo Esp se creo correctamente',
                success : true,
                data : data.id
            })
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al crear el Modulo Esp',
                success: false,
                error: error

            });
        }
    },

    async dataReading(req, res, next){
        
        try {
            const id = req.body;
            console.log(`Lectura enviada: ${JSON.stringify(id)}`);
            const data = await Esp8266.dataReading(id);
            return res.status(201).json({
                message : 'La lectura fue enviada',
                success : true,
                data : data.id
            })
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al enviar el dato',
                success: false,
                error: error

            });
        }
    },

    

    async error(req, res, next){
        
        try {
            const id = req.body;
            console.log(`Lectura enviada: ${JSON.stringify(id)}`);
            const data = await Esp8266.error(id);
            const options =  notification_options
            var idMachine = await Esp8266.getMachineIdByEspId(id.id);
            var machine = await Esp8266.getMachineByEspId(idMachine.id_machine);
            var fcmTokens = await Esp8266.getUsersFcm();
            let testData = [];
            fcmTokens.forEach(element => {
                    testData.push(element.fcm_token)
                });
            console.log(testData)

            var payload = {
                notification: {
                  title: "Hubo un error en la maquina " + machine.name,
                  body: "Revisa el estado de la maquina lo antes posible"
                },
                data : {
                    "id" : machine.id,
                    "name" : machine.name
                  }
              };
        
              testData.forEach(element => {
                if(element != null){
                    admin.messaging().sendToDevice(element, payload, options)
                }
            });
        
            

            return res.status(201).json({
                message : 'Error Cargado',
                success : true,
                data : data.id
            })
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al enviar el dato',
                success: false,
                error: error

            });
        }
    },

    async getAllErrors(req, res, next){
        try{
            const esp = await Esp8266.getAllErrors();
            return res.status(200).json(esp);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status.json({
                success: false,
                message: 'Error al obtener el usuario por ID',
                error: error
            });

        }
    },

    async test(req, res){
        try {
            console.log('hola testep');

            return res.status(200).json({
                success: true,
                messege: 'Oks perro',
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






}

// function notificate(){
//     const options =  notification_options
//     console.log('Entro a notificate');


//     const registrationToken = 'fwv2akceQGSgz3n9GEv2Bl:APA91bFdXkCmLppMuPVmOGyDNC58Ss7NqSTrmhNiTiZGQj2HJ76F5Q5vdf9i9SZV1lub4pEvhQL7ICNJIzcHqhPIkafes06W3x_9F_xpIkGxlUKKBxjeb9526FFST-bmEMPTpgAwtD-R';
//     var payload = {
//         notification: {
//           title: "This is a Notification",
//           body: "This is the body of the notification message."
//         }
//       };

//       admin.messaging().sendToDevice(registrationToken, payload, options)
//       .then( response => {

//        res.status(200).send("Notification sent successfully")
       
//       })
//       .catch( error => {
//           console.log(error);
//       });


// }