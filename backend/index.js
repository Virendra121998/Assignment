const express=require('express');
const mongoose=require('mongoose');
const zone=require('./Models/zone');
const category=require('./Models/city_categories');
const pro_zone_tagging=require('./Models/pro_zone_tagging');
const calender=require('./Models/calender');
var bodyparser=require('body-parser');
var cors =require('cors');
const app=express();
const port=process.env.PORT||5000;


app.use(cors());
var router = express.Router();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
//app.use(express.urlencoded({ extended: false }));

mongoose.Promise=global.Promise;


app.post('/zone',(req,res)=>{
    var Zone=new zone({
        name:req.body.name,
        city:req.body.city,
        category:req.body.category,
        boundary:{
            lat:req.body.boundary.lat,
            lng:req.body.boundary.lng
        },
        is_active:req.body.is_active
    });
    Zone.save().then((result)=>
    {    res.send({result})
         console.log(JSON.stringify(result))
    })
    .catch((err)=>{
        res.send(err);
        console.log(err);
    })
});

app.get('/zone',(req,res)=>{
    zone.find({})
    .then((result)=>{
        res.send({result});
        console.log(JSON.stringify(result[0].name));
    })
    .catch((err)=>{
        res.send(err);
        console.log(error);
    })
});

app.get('/onezone',(req,res)=>{
    zone.find({
        city:req.query.city,
        category:req.query.category
    }).then((result)=>{
        console.log(result)
        res.send({result})

    }).catch((error)=>{
        res.send(error);
    })
});

app.post('/city_categories',(req,res)=>{
    var city_category=new category({
        city:req.body.city,
        category:req.body.category,
        is_active:req.body.is_active
    });
    city_category.save().then((result)=>{
       res.send({result});
       console.log(JSON.stringify(result));
    }).catch((error)=>{
        res.send(error);
        console.log(error);
    })
});


app.get('/city_categories',(req,res)=>{
    category.find({}).then((result)=>{
        res.send({result});
    }).catch((error)=>{
        res.send(error);
        console.log(error);
    })
});

app.post('/prozone',(req,res)=>{
  var prozone=new pro_zone_tagging({
      provider_id:req.body.provider_id,
      zone_id:req.body.zone_id,
      is_active:req.body.is_active
  });
  prozone.save().then((result)=>{
      res.send({result});
      console.log(result);
  }).catch((error)=>{
      res.send(error);
  })
});

app.post('/calender',(req,res)=>{
 var cal=new calender({
     provider_id:req.body.provider_id,
     event_type:req.body.event_type,
     start_date:new Date(req.body.start_date.year,req.body.start_date.month,req.body.start_date.date,0,0,0,0),
     start_time:new Date(0,0,0,req.body.start_time.hour,req.body.start_time.min,0,0),
     end_time:new Date(0,0,0,req.body.end_time.hour,req.body.end_time.min,0,0),
     request_id:req.body.request_id
 });
 cal.save().then((result)=>{
     res.send({result});
     console.log(result);
 }).catch((error)=>{
     res.send(error);
 })
});

app.get('/calender',(req,res)=>{
    let date=new Date(req.query.year,req.query.month,req.query.date,0,0,0,0)
    console.log(date,typeof(date))
    calender.find({
        start_date: date
    }).then((result)=>{
        res.send({result});
    }).catch((error)=>{
        res.send(error);
    })
});

mongoose.connect('mongodb+srv://Virendra:virendra@assignment-gg74z.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(()=>{
    app.listen(5000);
    console.log('Connected to database');
}).catch((err)=>{
    console.log(err);
});
