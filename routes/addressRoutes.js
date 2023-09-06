const AddressController = require('../controllers/addressController');
const passport = require('passport');
const Address = require('../models/address');

module.exports = (app) => {

    app.get('/api/address/getAll', AddressController.getAll);

    app.get('/.well-known/apple-app-site-associationasd', AddressController.test);

    app.get('/api/address/findByCity/:id_city',  AddressController.findByCity);



    app.post('/api/address/create', AddressController.create);

}