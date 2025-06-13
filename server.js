const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
//const Product=require('./models/Product');
const app=express();
app.use(bodyParser.json());
mongoose.connect(
    'mongodb://localhost:27017',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>
    console.log("Connection to mongodb is successfull")
).catch((err)=>
    console.error(err)
)
app.get('/',(req,res)=>{
    res.send('server is up and running')
})
app.listen('3000',()=>
    console.log('Server is running on port 3000')
);
//Create a Product-Insert a Product
 app.post('/products', async(req,res)=>
    {
     try
     {
        console.log(req.body);
       const product=  new Product(req.body);
       await product.save();
       res.status(201).send(product);
   }
     catch(err)
     {
         res.status(400).send(err);
     }
});
//get all products
app.get('/products',async(req,res)=>{
    try{
        const products=await Product.find();
        res.send(products);
    }
    catch(err){
        res.status(500).send(err);
    }
});
//get product by id
app.get('/products/:id',async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        res.send(product);
        if(!product){
            res.status(404).send('Not Found');
        }
    }
    catch(err)
    {
        res.status(500).send(err);
    }
});
//update/put product
app.put('/products/:id',async(req,res)=>{
    try{
       const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
       res.send(product);
    }
    catch(err)
    {
        req.status(500).send(err);
    }
    
});
//delete
app.delete('/products/:id',async(req,res)=>{
    try{
            const product=await Product.findByIdAndDelete(req.params.id);
    res.send(product);
    }
    catch(err){
        req.status(500).send(err);
    }
});