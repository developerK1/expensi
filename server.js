const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const transactionRoutes = require('./routes/transaction.route');
const port = process.env.PORT || 4040;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const uri = process.env.DB_URI;
mongoose.connect(uri, { useUnifiedTopology: true });
const connection = mongoose.connection;


connection.once('open', ()=>{
	console.log("MongoDB database connection established successfully ");
})

// Allow requests from all domains
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/views' });
});
app.use('/transaction', transactionRoutes);

app.listen(port,()=>{
	console.log("server started on port " + port)
})