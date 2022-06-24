const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./db/connectDB');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/user', userRoutes);

connectDB();


app.listen(3030, (err) => {
    if(err) throw err;
    console.log('Working at 3030');
})