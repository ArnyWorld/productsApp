const mongoose = require("mongoose");

const conectarDB = async ()=>{
    try{
        await mongoose.connect('mongodb://mongo/meanproductos', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("BD Conectada");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}


module.exports = conectarDB