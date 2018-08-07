var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysqlcode',
  database : 'ems'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
//console.log(employeeId);

var isEmployeeExist = function(employeeId, callback){

  connection.query("select count(*) as count from employee where emp_id = " + "'" + employeeId + "'" , function (err, result, fields) {
  if (err) throw err
  callback(result[0].count);
});
}

var isCeoExist = function(callback){
  connection.query("select count(*) as count from employee where des_id = 1" , function (err, result, fields) {
  if (err) throw err
  if(result[0].count <=0 )
  {
    callback(false);
  }
  else
  {
    callback(true);
  }
});
}

var getPin = function(employeeId,callback){
  connection.query("select pin from employee where emp_id = " + "'" + employeeId + "'" , function (err, result, fields) {
  if (err) throw err
  callback(result[0].pin);
});
}

var getFirstName = function(employeeId, callback){
  connection.query("select first_name from employee where emp_id = " + "'" + employeeId + "'" , function (err, result, fields) {
  if (err) throw err
  callback(result[0].first_name);
});
}

var getLastName = function(employeeId, callback){
  connection.query("select last_name from employee where emp_id = " + "'" + employeeId + "'" , function (err, result, fields) {
  if (err) throw err
  callback(result[0].last_name);
});
}

var getDesignation = function(employeeId, callback){
  connection.query("select des.des_name as designation from designation des join employee emp on emp.des_id = des.des_id where emp_id = " + "'" + employeeId + "'" , function (err, result, fields) {
  if (err) throw err
  callback(result[0].designation);
  });
}

var getNewUserId = function(callback){
  connection.query("select max(emp_id) as newId from employee", function (err, result, fields) {
  if (err) throw err
  callback(result[0].newId);
});
}

var insertEmployee = function(firstName, lastName, designation, pin, callback){
  connection.query("select des_id from designation where des_name = " + "'" + designation + "'" , function (err, result, fields) {
  if (err) throw err
    connection.query("insert into employee values(null, " + "'" + firstName + "'" + ", " + "'" + lastName + "'" +  ", " + "'" + result[0].des_id + "'" + ", " + "'" + pin + "'" +", NOW(), NOW(), 0)", function (err, result, fields) {
    if (err) throw err
      getNewUserId(function(id){
          callback(id);
      });
    });
});
}

module.exports.isEmployeeExist = isEmployeeExist;
module.exports.getPin = getPin;
module.exports.getFirstName = getFirstName;
module.exports.getLastName = getLastName;
module.exports.getDesignation = getDesignation;
module.exports.isCeoExist = isCeoExist;
module.exports.insertEmployee = insertEmployee;
