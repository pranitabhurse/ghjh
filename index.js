

var express = require('express');

var cors = require('cors')

var app = express();
var router = express.Router();
var bodyParser = require("body-parser"); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());









router.use((req , res , next)=>{
// console.log('middleware');
next()
})


app.use('/api', require('./ApiForms/Router'));



app.get('/',function(req , res){
    res.send('helloo')

})
var server = app.listen(5000, function () {
    console.log('Server is running..');
});


   
   

//     // connect to your database
//     sql.connect(config, function (err) {
    
//         if (err) console.log(err);

//         // create Request object
//         var request = new sql.Request();
           
//         // query to the database and get the records
//         request.query('select * from entry', function (err, recordset) {
            
//             if (err) console.log(err)

//             // send records as a response
//             res.send(recordset);
            
//         });
//     });
// });