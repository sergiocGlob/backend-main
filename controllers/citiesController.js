const City = require('../models/city');


module.exports = {

    async getAll(req, res, next){
        try {
            const data = await City.getAll();
            console.log(`Cities ${JSON.stringify(data)}`);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las Ciudades',
                error: error,
                success: false
            })
            
        }


    },

    async create(req, res, next){
        
        try {
            const city = req.body;
            console.log(`Ciudad enviada: ${city}`);
            const data = await City.create(city);
            return res.status(201).json({
                message : 'La ciudad se creo correctamente',
                success : true,
                data : data.id
            })
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al crear la Ciudad',
                success: false,
                error: error

            });
        }
    }


}