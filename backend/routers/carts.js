const express = require('express');
const router = express.Router();

const {checkOut, getCheckOut, payment}= require('../database/carts.js');
const {verifyTokenAndAuthorization}= require('./auth.js');

router.post('/:id', checkOut);
router.get('/:id', getCheckOut );
router.get('/pay/:id',verifyTokenAndAuthorization, payment);

module.exports=router;