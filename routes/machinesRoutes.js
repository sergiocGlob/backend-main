const MachinesController = require('../controllers/machinesController');
const passport = require('passport');

module.exports=(app) => {
    

    app.get('/api/machines/findByCategory/:id_category', passport.authenticate('jwt', {session: false}), MachinesController.findByCategory);


    app.get('/api/machines/findByBuilding/:id_address', passport.authenticate('jwt', {session: false}), MachinesController.findByBuilding);


    //app.post('/api/machines/create', passport.authenticate('jwt', {session: false}) ,upload.array('image', 2), MachinesController.create);

}