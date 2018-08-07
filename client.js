var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var util = require('./util.js');
var service = require('./service.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


app.get('/', function(req,res){
  res.render('index',{message: ''});
})

app.post('/login', function(req, res){
  var employeeId = req.body.employeeId;
  var pin = req.body.pin;
  //console.log('client--'+employeeId);
  //res.send('id:' + req.query.employeeId + ' ' + 'pin: ' + pin);
  service.isEmployeeExist(employeeId, function(bool){
    if(bool){
      service.validateUser(employeeId,pin, function(authenticate){
        if(authenticate)
        {
          service.getFirstName(employeeId, function(firstName){
            service.getLastName(employeeId, function(lastName){
              service.getDesignation(employeeId, function(designation){
                res.render('welcome',{message: 'You have successfully Logges in',firstName: firstName, lastName: lastName, designation: designation});
              });
            });
          });

        }
        else
        {
          res.render('index',{message:'Authentication Failed !!'});
        }
      });
    } else{
      res.render('index',{message:'Authentication Failed !!'});
    }
  });
});

app.post('/signup', function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var designation = req.body.designation;
  var pin = req.body.pin;
  service.addEmployee(firstName, lastName, designation, pin,  function(message){
    res.render('index',{message: message});
  });
});

app.get('/signuppage', function(req,res){
  res.render('signup',{message: ''});
})

app.get('/index', function(req,res){
  res.render('index',{message: ''});
})


var server = app.listen(3000);
