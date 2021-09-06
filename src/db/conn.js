const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://gaurav:gupta@cluster0.8mucg.mongodb.net/Ajay_sanodiya?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connection successful")).catch((err) => console.log(err));


const dataschema=mongoose.Schema({

link:{
    type:String,
    require:true,

},
title:{
    type:String,
    require:true,
    unique: true,
    
    
},
dis:{
    type:String,
    require:true
},
type:{
    type:String,
    require:true,

},
view:{
    type:Number,
    require:true,
    default:0,

},
date:{
    type:Date,
    require:true,
    default:Date.now()
}


});

const DataModal=mongoose.model("image",dataschema);

module.exports = DataModal;