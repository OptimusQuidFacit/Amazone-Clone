const express= require('express');
const dotenv= require('dotenv');
const cryptojs = require('crypto-js');
const router = express.Router();
dotenv.config();
const {signIn, signUp} = require('../database/users.js');

router.post('/register', signUp);
router.post('/login', signIn );

module.exports=router;