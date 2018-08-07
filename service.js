var dao = require('./dao.js');
var isEmployeeExist = function(employeeId, callback){
  //console.log('service  - ' +employeeId);
    dao.isEmployeeExist(employeeId, function(count){
      if(count <= 0)
      {
        callback(false);
      }
      else
      {
        callback(true);
      }
    });
}

var validateUser = function(employeeId,pin, callback){
  dao.getPin(employeeId,function(correctPin){
    if(pin == correctPin)
    {
      callback(true);
    }
    else
    {
      callback(false);
    }
  })
}

var getFirstName = function(employeeId, callback){
  dao.getFirstName(employeeId, function(firstName){
    callback(firstName);
  });
}

var getLastName = function(employeeId, callback)
{
  dao.getLastName(employeeId, function(lastName){
    callback(lastName);
  });
}

var getDesignation = function(employeeId,callback){
  dao.getDesignation(employeeId, function(designation){
    callback(designation);
  });
}

var addEmployee = function(firstName, lastName, designation, pin, callback){
  if(designation == 'CEO')
  {
    dao.isCeoExist(function(bool){
      if(bool)
      {
        callback('Ceo Already Exist in The database');
      }
      else
      {
        dao.insertEmployee(firstName, lastName, designation, pin, function(id){
          callback('Your Auto Generated Id is: ' + id);
        });
      }
    });
  }
  else
  {
    dao.insertEmployee(firstName, lastName, designation, pin, function(id){
      callback('You have successfully Signed Up !! Your Auto Generated Id is: ' + id);
    });
  }
}

module.exports.isEmployeeExist = isEmployeeExist;
module.exports.validateUser = validateUser;
module.exports.getFirstName = getFirstName;
module.exports.getLastName = getLastName;
module.exports.getDesignation = getDesignation;
module.exports.addEmployee = addEmployee;
