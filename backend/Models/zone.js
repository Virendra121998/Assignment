var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var schema=new Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
    category:{type:String,required:true},
    boundary:[{
        lat:{type:String,required:true},
        lng:{type:String,required:true}
    }],
    
});

var zone=mongoose.model('zone',schema);

module.exports=zone;
