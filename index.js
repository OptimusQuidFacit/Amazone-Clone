const express = require ('express');
const bodyParser= require('body-parser');
const path = require('path');
const app = express();


const connect=require('./backend/database/users.js').connect;
const userRouter = require('./backend/routers/users.js');
const getCategoryRouter= require('./backend/routers/products.js');
const getDetailsRouter= require('./backend/routers/getdetails.js');
const ordersRouter= require('./backend/routers/orders.js');
const cartsRouter= require('./backend/routers/carts.js');
const cors= require('cors');
app.use(cors()); // Allow all origins (not recommended for production)


// Parse JSON request bodies
connect();
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')));
app.use('/user', userRouter);

//ejs config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');







app.get('/node_modules/bootstrap-icons/font/bootstrap-icons.css', (req, res)=>{
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'node_modules', 'bootstrap-icons','font', 'bootstrap-icons.css'));
    
});
app.get('/node_modules/bootstrap-icons/font/bootstrap-icons.min.css', (req, res)=>{
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'node_modules', 'bootstrap-icons','font', 'bootstrap-icons.css'));
    
});
app.get('/node_modules/bootstrap/dist/js/bootstrap.min.js', (req, res)=>{
    res.type('text/javascript');
    res.sendFile(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.min.js'));
    
});

/*app.get('/sidebars.css', (req, res)=>{

    res.type('text/css');
    res.sendFile(path.join(__dirname, 'views', 'sidebars.css'));
    
});*/

app.use('/products', getCategoryRouter);
app.use('/product', getDetailsRouter);
app.use('/buy', ordersRouter);
app.use('/checkout', cartsRouter);
const port= process.env.PORT || 5000;
app.listen(port, ()=>{

    console.log(`Listening on ${port}`);
  
});




