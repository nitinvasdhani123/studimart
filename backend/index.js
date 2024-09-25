const express = require('express');
const mongoose = require('mongoose');
const server = express();
const PORT = 8080;
const cors = require('cors');
const userRouter = require('./routers/user');
const categoryRouter = require('./routers/category');
const collegeRouter = require('./routers/college');
const productRouter = require('./routers/product');



// middleware to connect react port 5173 with backend port 8080 : it act like barrier because security of each port don't allow both without this middleware
server.use(cors());

// bodyparser : it take data from body
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use('/upload', express.static('upload'));


// middleware to connect with users routes
server.use('/user',userRouter.userRouter);
server.use('/product',productRouter.productRouter);
server.use('/category',categoryRouter.categoryRouter);
server.use('/college',collegeRouter.collegeRouter);

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/studimart');
  console.log('database connected');
}

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});