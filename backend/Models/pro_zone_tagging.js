var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var schema=new Schema({
    provider_id:{type:String,required:true},
    zone_id:{type:String,required:true},
    is_active:{type:String,required:true}
});

var pro_zone_tagging=mongoose.model('pro_zone_tagging',schema);

module.exports=pro_zone_tagging;
