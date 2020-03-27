var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var schema=new Schema({
    provider_id:{type:String,required:true},
    start_date:{type:Date,required:true},
    start_time:{type:Date,required:true},
    end_time:{type:Date,required:true},
    event_type:{type:String,required:true},
    request_id:{type:String,required:true}
});

var calender=mongoose.model('Calender',schema);

module.exports=calender;
