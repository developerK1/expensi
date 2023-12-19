const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const transactionRoutes = require('./routes/transaction.route');
const port = process.env.PORT || 4040;


const corsOptions = {
  origin: 'https://budget-app-blush.vercel.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable cookies and HTTP authentication
  optionsSuccessStatus: 204, // Respond to preflight requests with 204 No Content
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://maobakg:pWResSro3qdalaGq@cluster0.uidjjph.mongodb.net/FinancialLog');
const db = mongoose.connection;

db.once('open', ()=>{
	console.log("MongoDB database connection established successfully");
})


// Allow requests from all domains
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/transaction', transactionRoutes);


app.listen(port,()=>{
	console.log("server started on port " + port)
})
