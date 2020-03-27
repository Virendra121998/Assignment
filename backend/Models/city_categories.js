var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var schema=new Schema({
    city:{type:String,required:true},
    category:{type:String,required:true},
    is_active:{type:String,required:true}
});

var category=mongoose.model('City_Categories',schema);

module.exports=category;
