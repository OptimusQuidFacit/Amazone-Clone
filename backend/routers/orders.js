const express= require('express');
const router = express.Router();
const dotenv= require('dotenv');
const dbobject=require('../database/users.js');
dotenv.config;
const { ObjectId } = require('mongodb');


const {addOrder, getOrders, deleteOrder, orderModel}= require('../database/orders.js');
let cartItems=[];
const {verifyTokenAndAuthorization}= require('../routers/auth.js');

router.post('/:id?', verifyTokenAndAuthorization, addOrder);
router.delete('/delete/:id?',verifyTokenAndAuthorization, deleteOrder);
//router.get('/delete?', getOrders);
router.get('/:id', getOrders);



module.exports=router;