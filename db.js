const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient;
const ObjectId=mongodb.ObjectId



let database;
 async function getdatabase(){
    const connection=await MongoClient.connect("mongodb://127.0.0.1:27017");
  database=connection.db("crud8");
  if(!database){
   console.log("not connected");
   
  }


  return database;
 }
 module.exports={
   getdatabase,
   ObjectId
 }