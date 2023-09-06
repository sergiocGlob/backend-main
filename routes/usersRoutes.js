const UsersController = require('../controllers/usersController');
const passport = require('passport');


module.exports = (app) => {

    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findById/:id', passport.authenticate('jwt', {session: false}), UsersController.findById);



    app.post('/api/users/create', UsersController.registerWithImage);

    app.post('/api/users/login',UsersController.login);
    app.post('/api/users/fcm',UsersController.fcmUpdate);
    app.post('/api/users/logout',UsersController.logout);


    app.put('/api/users/update', passport.authenticate('jwt', {session: false}), UsersController.update);
}