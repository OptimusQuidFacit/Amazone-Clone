const dbobject=require('./users.js');
const { ObjectId } = require('mongodb');

const orderModel = dbobject.client.db("amazon_db").collection('orders');
let productCollection= require('../database/products.js').productModel;


const addOrder = async (req, res)=>{

// Convert the string to a MongoDB ObjectId
const queryId = new ObjectId(req.query.id);
   const product = await productCollection.findOne({_id: queryId});
  
   let order= {UserId:req.params.id, ProductId: req.query.id, Quantity: req.query.qty, Title: product.Title, Price: product.Price, Img: product.Img }
   if(order){
    //dbobject.client.connect();
   const orderExists =  await orderModel.findOne(order);
orderExists ?  console.log('Order Already Exists') : await orderModel.insertOne(order);
//dbobject.client.close();
}
   // });
   let orderArray = await orderModel.find({}).toArray();
       /*entry.push(...electronics);
       console.log(entry);*/
       let Total=0;
       orderArray.forEach(product=>{Total+=product.Price*product.Quantity})
       res.render('cart', {products: orderArray, Total});

 
 
 }
 const getOrders= async (req, res)=>{
   
   orders= await orderModel.find({}).toArray();
   let Total=0;
   usersOrders=orders.filter(product=>product.UserId==req.params.id)
   usersOrders.forEach(product=>{Total+=product.Price*product.Quantity})
   res.render('cart', {products: usersOrders, Total});
  // res.json({orders});  

}
const deleteOrder = async (req, res)=>{
 try{  
   //let queryId=new ObjectId(req.query.id)
   await orderModel.deleteOne({ProductId: req.query.id})
   
      console.log(`${res.query.id} deleted`);
      let orderArray = await orderModel.find({}).toArray();
          /*entry.push(...electronics);
          console.log(entry);*/
          let Total=0;
          orderArray.forEach(product=>{Total+=product.Price*product.Quantity})
          //res.render('cart', {products: orderArray, Total});
          res.json({msg:'Item deleted', productId:req.query.id});
     }
      
      catch(err){res.send(err)}
}
 module.exports = {addOrder, getOrders, deleteOrder, orderModel};