const dbobject=require('./users.js');
const { ObjectId } = require('mongodb');

//model

let productModel = dbobject.client.db("amazon_db").collection('products');
let entry={}


// controllers



 const addProduct = async (req, res)=>{
   req.body=entry;
   //when I start sending new entries from client, it would be:
   //{entry} = req.body
   if(req.body){
    //dbobject.client.connect();
   const productExists =  await productModel.findOne(req.body);
productExists ?  console.log('Product Already Exists') : await productModel.insertOne(req.body);
//dbobject.client.close();
}
let products = await productModel.find({}).toArray();
const specificCategory = (req.query.category==='all') ? products : products.filter(product=>product.Category===req.query.category)
 res.render('category', {specificCategory, type: req.query.category})
   // });


}
const getProducts = async (req, res)=>{

   let products = await productModel.find({}).toArray();

   //return productArray;

const specificCategory = (req.query.category==='all') ? products : products.filter(product=>product.Category===req.query.category)
        /*entry.push(...electronics);
        console.log(entry);*/
        res.render('category', {specificCategory, type: req.query.category});
}
//Delete-products-contoller
const deleteProduct = async (req, res)=>{
 queryId = new ObjectId(req.query.id);
 
   await productModel.findOneAndDelete(req.query.id);
   products = productModel.find({}).toArray();
   res.json('deleted:', {products});


}
const getDetails= async (req, res)=>{
   let products = await productModel.find({}).toArray();
   // products.forEach(product=> console.log(`${product._id.toString()} and ${req.query.id}`))
   const product = products.filter(product => product._id.toString()==req.query.id)[0];
   console.log(product._id);
    res.render('productdetails', {product, type: product.Category});
}
module.exports = {getProducts, getDetails, addProduct, deleteProduct, productModel};
/*addProduct(newEntry).then(productsArray=>{
array.push(...productsArray);

});*/


