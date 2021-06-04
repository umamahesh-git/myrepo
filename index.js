var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.get('/', function (req, res) {
    console.log('hello world');
});
 
app.listen(3000, function(){
    console.log('Server running at port 3000: http://127.0.0.1:3000');
	

});

var mysql = require('mysql');
 const dbConn = mysql.createConnection({
  host     : '37.59.55.185',
  user     : '7oZGcMFo7M',
  password : '1d5A6M2uPR',
  database : '7oZGcMFo7M'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;


//Insertion operation

app.post('/myapi', function (req, res) {
  
  var myapi = {
	  
		uid: req.body.uid,
		uname: req.body.uname,
		department: req.body.department
		
	  }
  
     dbConn.query("INSERT INTO `myapi` SET ?", myapi, function (err, results,fields) {
		if(!err) {
			res.send('New record has been created successfully.' );
		} else {
			 res.send(err);
		}
    });
});


//Retrieval operation

app.get('/myapi', function (req, res) {
    dbConn.query('SELECT * FROM myapi', function (err, results) {
		if(err) {
			throw err;
		} else {
			return res.send({ status: true, data: results});
		}
    });
});

app.delete('/myapi', function (req, res) {
  
    
      dbConn.query('DELETE FROM myapi WHERE uid = ?', [req.body.uid], function (err, results,fields) {
		if(err) {
			throw err;
		} else {
			 return res.send({ status: true, data: results, message: 'record has been deleted successfully.' });
		}       
    });
}); 


app.put('/myapi', function (req, res) {
  
    dbConn.query('UPDATE myapi SET uname=?,department=? WHERE uid=?', [req.body.uname,req.body.department,req.body.uid], function (err, results,fields) {
		if(!err) {
			res.send( 'record has been updated successfully.');
		} else {
			  res.send(err);
		}       
    });
}); 