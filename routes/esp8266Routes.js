const { request, response } = require('express');
const passport = require('passport');
const Esp8266Controller = require('../controllers/esp8266Controller');
//const notification = require('../notification.js');


module.exports = (app) => {

    app.get('/hola', Esp8266Controller.test);

    app.get('/api/esp8266/findByIdEsp/:id', Esp8266Controller.findById);

    app.get('/api/esp8266/findByIdData/:id', Esp8266Controller.findByIdData);

    app.post('/api/esp8266/update/', Esp8266Controller.update);

    app.post('/api/esp8266/create', passport.authenticate('jwt', {session: false}), Esp8266Controller.create);

    app.get('/api/esp8266/findByMachine/:id', Esp8266Controller.findByMachineEsp);

    app.post('/api/esp8266/update/dataReading', Esp8266Controller.dataReading);

    app.post('/api/esp8266/update/error', Esp8266Controller.error);

    app.get('/api/esp8266/errors', Esp8266Controller.getAllErrors);




    //app.get('/api/notification', Esp8266Controller.notificate);

    // const notification_options = {
    //     priority: "high",
    //     timeToLive: 60 * 60 * 24
    //   };

    // app.post('/firebase/notification', (req, res)=>{
    //     // const  registrationToken = req.body.registrationToken
    //     // const message = req.body.message
    //     const options =  notification_options
        

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
    // )
    


    // app.post('/api/esp8266/update/', (request, response)=>{
    //     console.log(request.body)
    // });


}