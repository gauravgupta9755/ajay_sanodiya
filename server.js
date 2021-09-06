const express = require('express');

const DataModal=require("./src/db/conn");
const mongoose = require('mongoose');
const app=express();
const port= process.env.PORT||3000
require("./src/db/conn");
const hbs = require('hbs');
const path = require('path');
const fileupload = require('express-fileupload');
const { json } = require('express');
const { find } = require('./src/db/conn');



app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})

const static_path=path.join(__dirname,"./public");
const template_path=path.join(__dirname,"./template/views");
const partials_path=path.join(__dirname,"./template/partials");
app.use(express.static(static_path));
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partials_path)
app.use(express.json())
app.use(express.urlencoded({extended:false}));

// set storage engine------------------
app.use(fileupload());

// upload data to data base---------------
const uploadDatabase=(modal,data,filename,filemimetype)=>{
const newdata=new modal({
    link:filename,
    title:data.title,
    dis:data.dis,
    type:filemimetype,
    data:Date.now()

});
newdata.save().then(()=>{console.log("uploaded")}).catch((err)=>{
    console.log(err)
})
}



app.post('/imageupload',(req,res)=>{
 
 if(req.files&&req.body.title!=""&&req.body.dis!=""){
     var file=req.files.file;
     if(file.mimetype=="image/jpeg"||file.mimetype=="imgae/png"||file.mimetype=="image/gif")
     {
        var filename=file.name;
        file.mv("./public/uploads/image/"+filename,function(err){
            if(err){
                res.send(err);
            }
            else{
               res.send("file uploaded");
               uploadDatabase(DataModal,req.body,filename,file.mimetype)
           }
            
        });
     }
     else{
         res.send("file type is invalid :only jpeg,gif,png type allowed")
     }
     

 }

})
app.post('/videoupload',(req,res)=>{
   
   if(req.files&&req.body.title!=""&&req.body.dis!=""){
       var file=req.files.file;
       if(file.mimetype=="video/mp4"){
        var filename=file.name;
        file.mv("./public/uploads/video/"+filename,function(err){
            if(err){
                res.send(err);
            }
            else{
               res.send("file uploaded");
               uploadDatabase(DataModal,req.body,filename,file.mimetype)
           }
            
        })
   
       }
       else{
        res.send("file type is invalid :only mp4 allow");
    }
     
   }
  
  })


app.post("/link",(req,res)=>{
    if(req.body.link!=""&&req.body.title!=""&&req.body.dis!=""){
        uploadDatabase(DataModal,req.body,req.body.link,"video/youtube");
        res.send("uploaded")
    }
  else{
      res.send("not uploaded");
  }

})


app.post("/admin",(req,res)=>{
    console.log(req.body.password);
    
    if(req.body.username=="gauravgupta"&&req.body.password=="gupta"){
        res.render("data_fill");
    }
    else{res.send("user name or password is incorrect")}
    
    })

    app.use(express.static("public/uploads/image"))
    app.use(express.static("public/uploads/video"))
   


app.get("/admin.html",(req,res)=>{
    res.render("admin");
})

app.get("/all",async (req,res)=>{
   const getdata= await DataModal.find();
   res.send(getdata);
  
})
app.get("/image",async (req,res)=>{
    const getdata= await DataModal.find({type:"image/jpeg"||"image/gif"||"image/png"});
    res.send(getdata);
 })
 app.get("/video",async (req,res)=>{
    const getdata= await DataModal.find({type:"video/mp4"});
    res.send(getdata);
 })
 app.get("/youtubelink",async(req,res)=>{
    const getdata= await DataModal.find({type:"video/youtube"});
    res.send(getdata);
 })




