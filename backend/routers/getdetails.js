const express= require('express');
const router = express.Router();
const dotenv= require('dotenv');
const dbobject=require('../database/users.js');
dotenv.config;

const getDetails= require('../database/products.js').getDetails;

router.get('/', getDetails);



module.exports=router;