const dbobject=require('./users.js');
const axios= require('axios');
const paystack= require('paystack-api')(process.env.TEST_SEC)
const { ObjectId } = require('mongodb');

// This cart will only contain confirmed purchases
let cartsModel = dbobject.client.db("amazon_db").collection('carts');
let {orderModel} = require('./orders.js')
let {usersCollection} = require('./users.js');

let items=[];
let Total=0;
const checkOut = async (req, res)=>{


   //axios.get(`http://localhost:5000/checkout/${req.params.id}`)
   //.then( response=> res.json(response.data))
  // let cart= await response.json();
  let {User, Date, Amount} = req.body;
   //items=Products;
   let items= (await orderModel.find({}).toArray()).filter(product=> product.UserId==req.params.id)
   const cartExists= await cartsModel.findOne({User: req.params.id});
   cartExists ? await cartsModel.updateOne({User: req.params.id}, {$set:{User, Date, Amount, Products:items}}): await cartsModel.insertOne({Products: items.map(item=>item.Title), User: User, Date: Date, Amount:Amount});
   Total=parseInt(Amount);
   res.json({items, Total});
  
}
const getCheckOut= async (req, res)=>{
   // let { Amount} = req.body;
   let items= (await orderModel.find({}).toArray()).filter(product=> product.UserId==req.params.id)
   let cart= await cartsModel.findOne({User: req.params.id});
   let amountInt= parseInt(cart.Amount);
   res.render('checkout', {items, Total: amountInt});
   
}
const payment= async (req,res)=>{
   
   let cart= await cartsModel.findOne({User: req.params.id});
   let amountInt= parseInt(cart.Amount);
   let queryId = new ObjectId(req.params.id);

   const user= await usersCollection.findOne({_id: queryId });
   const response = await paystack.transaction.initialize({
      email: user.Email,
      amount: amountInt * 100,
   });
  await  cartsModel.updateOne({User: req.params.id}, {$set:{
      paystack_ref: response.data.reference
   }})
   res.json({data: response.data, status: response.status, message: response.message})
}
module.exports ={checkOut, getCheckOut, payment, cartsModel}
/*addProduct(newEntry).then(productsArray=>{
array.push(...productsArray);

});*/


