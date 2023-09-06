const { response } = require("express");
//const admin = require("firebase-admin");
//const { cert } = require("firebase-admin/app");

/*function initFirebase() {
    const serviceAccount = require(__dirname+'/serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),

    });
}*/
//initFirebase();

function sendPushtoOneUser(notification){
    const message= {
        token: notification.tokenId,
        data: {
            titulo: notification.titulo,
            mensaje: notification.mensaje,
    }
    }
    sendMessage(message);
}

function sendMessage(message){
    admin.messaging().send(message)
    .then((response) => {
        console.log('Successfully sent message: ', response);
    })
    .catch((error) => {
        console.log('Error sending message: ', error)
    })
}
