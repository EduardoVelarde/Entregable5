const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce_2');

mongoose.connection.on("open",()=>{
    console.log('database connection SUCCESS')
})

mongoose.connection.on("error",()=>{
    console.log('database connection ERROR')
})
