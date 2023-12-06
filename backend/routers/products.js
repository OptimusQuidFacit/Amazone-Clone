

const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const dbobject = require('../database/users.js');
dotenv.config;
// const entry=[]
const {getProducts, getDetails, addProduct, deleteProduct, productModel} = require('../database/products.js');
// let getProducts= require('../database/products.js').getProducts;
const {verifyTokenAndAdmin}= require('../routers/auth.js');
//
//router.get('/:id?', verifyTokenandAuthorization, getProducts);
router.get('/?', getProducts);
router.delete('/delete/:id?', verifyTokenAndAdmin, deleteProduct);

//console.log(products.Title);
module.exports=router;