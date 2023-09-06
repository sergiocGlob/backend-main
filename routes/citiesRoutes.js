const CitiesController = require('../controllers/citiesController');
const passport = require('passport');
const City = require('../models/city');

module.exports = (app) => {

    app.get('/api/cities/getAll', passport.authenticate('jwt', {session: false}), CitiesController.getAll);

    app.get('/api/cities/getAlllll', CitiesController.getAll);



    app.post('/api/cities/create', passport.authenticate('jwt', {session: false}), CitiesController.create);

}