// sqlite3 package used to create an sqlite database
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(':memory:');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: '*'}));

db.serialize(function(){
  db.run("DROP TABLE IF EXISTS Inventory");
  db.run("CREATE TABLE Inventory (name TEXT, animal TEXT, description TEXT, " +
  	     "age INTEGER, price REAL)");
  var stmt = db.prepare("INSERT INTO Inventory VALUES (?,?,?,?,?)");
  stmt.run("Max", "Dog", "Wags tail when happy", "2", "250.00");
  stmt.run("Poppy", "Cat", "Black colour, friendly with kids", "3", "50.00");
  stmt.run("Riley", "Bird", "Bright bird", "2", "100.00");
  stmt.finalize();
});

// Make the backend available at localhost:3001/api
app.get("/api",
  function(req,res)
  {
    console.log("API REQUEST RECEIVED");
	if (req.query.act == "getall")
	{

  	  db.all("SELECT rowid as id, name, animal, description, age, price FROM Inventory",
        function(err, results)
        {
            if (err) 
            {
                console.log(err);
                res.json({"error" : "Could not get inventory"});
            }
            else {
                console.log(JSON.stringify(results));
                res.json(results);
            }
        });
	}
	
	// add an animal to the inventory
	else if (req.query.act == "add")
	{
		db.run("INSERT INTO Inventory(name,animal,description,age,price) VALUES (?,?,?,?,?)", 
        [
        req.query.name,
        req.query.animal, 
        req.query.description,
        req.query.age, 
        req.query.price],
        function(err, results) 
        {
            if (err) 
            {
                // console log error, return JSON error message
                console.log(err);
                res.json({"error" : "Could not insert animal"});
            }
            else
            {
                console.log(results);
                res.json({"status" : "Add animal successful"});
            }
            
        });
	}
	
	// delete an animal from the inventory
	else if (req.query.act == "delete")
	{
		db.run("DELETE FROM Inventory WHERE rowid=?", 
        [req.query.id],
        function(err, results) 
        {
            if (err) 
            {
                console.log(err);
                res.json({"error" : "Could not delete animal"});
            }
            else
            {
                console.log(results);
                res.json({"status" : "Delete animal successful"});
            }
            
        });
	}	

    // update an animal in the inventory
	else if (req.query.act == "update")
	{
		db.run("UPDATE Inventory SET name=(?), animal=(?), description=(?), " +
        "age=(?), price=(?) WHERE rowid=?", 
        [
        req.query.name,
        req.query.animal, 
        req.query.description,
        req.query.age, 
        req.query.price,
        req.query.id],
        function(err, results) 
        {
            if (err) 
            {
                console.log(err);
                res.json({"error" : "Could not update animal"});
            }
            else
            {
                console.log(results);
                res.json({"status" : "Update animal successful"});
            }
            
        });
	}	
	
	// search the inventory... search all fields that contain a provided term
	else if (req.query.act == "search")
	{

        db.all("SELECT rowid as id, name, animal, description, age, price FROM Inventory " +
            "WHERE name LIKE '%" + req.query.term + "%' OR " +
            "animal LIKE '%" + req.query.term + "%' OR " +
            "description LIKE '%" + req.query.term + "%' OR " +
            "age LIKE '%" + req.query.term + "%' OR " +
            "price LIKE '%" + req.query.term + "%'",
     
        function(err, results)
        {
        if (err) 
        {
            console.log(err);
            res.json({"error" : "Could not search inventory"});
        }
        else {
            console.log(JSON.stringify(results));
            res.json(results);
        }  
        });
	}	

	else 
	{
	  res.json({'error': 'act not found'});	
	}		 

});

// catch all case if no route found
app.get('*',function (req, res) {
  res.json({'error': 'route not found'});
});


// run the server
const server = app.listen(3001, function(){
  console.log("Pet Store Inventory Server listening on port 3001!")
});

