const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        const connection = await mongoose.connect("mongodb://127.0.0.1:27017/FinancialLog");
        console.log(`database connnect to ${connection.connection.host}`)
    }catch (err){
        console.log(err)
        process.exit(1)
    }
};


module.exports = connectDb;