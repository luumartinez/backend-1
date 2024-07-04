const mongoose = require ('mongoose')

try {
    //Conexión a la base de datos (mediante la url que ya usamos)
    mongoose.connect(process.env.MONGODB_CONNECT).then(() =>{
        console.log('DB conectada')
    })
} catch (error) {
    console.log(error)
}

module.exports = mongoose