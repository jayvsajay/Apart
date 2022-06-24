const mongoose = require('mongoose');
function connectDB(){
    let url = 'mongodb://localhost:27017/apart_fresh';
    mongoose.connect(url, (err, info)=>{
        if(err) throw err;
        console.log('MongoDB connected');
    })
}

module.exports = connectDB;