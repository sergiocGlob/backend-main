const Machine = require('../models/machine');
//const storage  = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');
const { findByBuilding } = require('../models/machine');


module.exports = {

    async findByCategory(req, res, next) {
        try {
            const id_category = req.params.id_category;
            const data = await Machine.findByCategory(id_category);
            console.log(`Machines ${JSON.stringify(data)}`);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error: ${error}`);
                return res.status(501).json({
                    message : `Error al listar maquinas por categoria`,
                    success : false,
                    error: error 
                });
        }



    },


    async create( req, res, next){

        let machine = JSON.parse(req.body.machine);
        console.log()

        const files = req.files;

        let inserts = 0;

        if (files.length === 0){

            return res.status(501).json({
                message : 'Error al registrar la maquina no tiene imagen',
                success : false
            });
        }
        else{
            try {

                const data =  await Machine.create(machine);// almacendo la informacion de la maquina
                machine.id = data.id;

                const start = async() => {
                    await asyncForEach(files,async(file)=>{
                        const pathImage = `image_${Date.now()}`;
                        const url = await storage (file,pathImage);

                        if(url !== undefined && url !== null){
                            if(inserts==0){
                                machine.image1 = url;
                            }
                            else if (inserts==1){
                                machine.image2 = url;
                            }
                        } 

                        await Machine.update(machine);
                        inserts = inserts + 1;

                        if (inserts == files.length){
                            return res.status(201).json({
                                success: true,
                                message: 'La maquina se ha registrado correctamente'
                            });
                        }
                    });
                }
                start ();
                
            } 
            catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    message : `Error al registrar la maquina ${error}`,
                    success : false,
                    error: error 
                });
                
            }
        }
    },

    async findByBuilding(req, res, next) {
        try {
            const id_address = req.params.id_address;
            const data = await Machine.findByBuilding(id_address);
            console.log(`Machines ${JSON.stringify(data)}`);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error: ${error}`);
                return res.status(501).json({
                    message : `Error al listar maquinas por categoria`,
                    success : false,
                    error: error 
                });
        }



    },



}