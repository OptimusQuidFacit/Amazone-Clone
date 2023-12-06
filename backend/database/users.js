const cryptojs = require('crypto-js');
const dotenv=require('dotenv');
dotenv.config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
const jwt= require('jsonwebtoken');
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const usersCollection = client.db("amazon_db").collection("users");
async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    await client.connect();
    console.log('You are connected to mongodb');

    // Send a ping to confirm a successful connection
  }
  catch (err){
    console.log(err);
  }
  
}
  const signIn = async (req,res)=>{
  try{
  // const users= dbobject.collection;
  const user= await usersCollection.findOne({Email: req.body.Name});
  //let products = await productModel.find({}).toArray();
  if(user){
      password= req.body.Password;
       decrypted = cryptojs.AES.decrypt(user.Password, process.env.PASS_SEC).toString(cryptojs.enc.Utf8);
      //res.json({decrypted, userExists});
      if (decrypted==password)
      {
          
      const accessToken= jwt.sign(
          {id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SEC, { expiresIn:"3d"}
      );
      let result = await usersCollection.updateOne(user, {$set:{
          token: accessToken
         }})
    
      if(result) console.log(`succesful update ${result}`);
      else{ console.log('Token not added')}
      res.json({message: "You have are logged in. Here are your details:", user: user, accessToken});
     
// const specificCategory = (req.query.category==='all') ? products : products.filter(product=>product.Category===req.query.category)
       //alert(`welcome ${user.Name}`)
      //res.render('category', {specificCategory, type: req.query.category, token: accessToken});
     
  } 
      else{
      res.status(401).json('Incorrect Password');
  }
  }
  else{
       res.status(401).json('User does not exist');
  }
  }
  catch(err){

      res.status(500);

  }
}
  const signUp= async (req, res)=>{
  try{
  const encrypted = cryptojs.AES.encrypt(req.body.Password, process.env.PASS_SEC).toString();
  
      const user= await usersCollection.insertOne({Name: req.body.Name, Password: encrypted, Email: req.body.Email, isAdmin:false});
      res.json(user);
       }
     catch(err) {

      res.status(401).json(err);

     }
  }

module.exports={connect, signIn, signUp, usersCollection, client}



