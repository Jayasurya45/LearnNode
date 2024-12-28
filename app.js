const express=require('express');
const app=express()
const bodyparser=require('body-parser')
const exhbs=require('express-handlebars')
const dbo=require('./db')
const ObjectId=dbo.ObjectId

app.use(bodyparser.urlencoded({extended:true}))

app.engine('hbs',exhbs.engine({layoutsDir:"views/",defaultLayout:"main",extname:"hbs"}));
app.set('view engine','hbs');
app.set('views','views');

var message='details'
app.get('/',async (req,res)=>{
    
   const database= await dbo.getdatabase();
   const collection=database.collection('crudTask');
  const cursor= collection.find({});
  const details=await cursor.toArray();
  let editid,editdet


  if(req.query.editid){
    editid=req.query.editid;
    editdet=await collection.findOne({_id: new ObjectId(editid)})

  }
  if(req.query.deleteid){
    await collection.deleteOne({_id:new ObjectId(req.query.deleteid)})
   return  res.redirect("/?status=3")
  }


    switch(req.query.status){
        case '1':
            message="created successfully";
            break;
        case '2':
            message="updated successfully";
            break;
         case '3':
            message="deleted successfully";
            break;
    }
  
   
    res.render('main',{message,details,editid,editdet});
})
app.post('/create',async (req,res)=>{
    const database= await dbo.getdatabase();
   const collection=database.collection('crudTask');
   const createdet={name:req.body.name,age:req.body.age}
   await collection.insertOne(createdet);
   return res.redirect('/?status=1')


})
app.post('/edit/:editid',async(req,res)=>{
    const database= await dbo.getdatabase();
    const collection=database.collection('crudTask');
    let createde={name:req.body.name,age:req.body.age}
   const editid= req.params.editid;
   await collection.updateOne({_id:new ObjectId(editid)},{$set:createde})
   return res.redirect('/?status=2')

})
app.listen(5000,()=>{
    console.log("listening")
})