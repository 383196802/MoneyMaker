const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')
const MongoDBDataModel = require('./mongodb-data-model.js')

const DB_url = "mongodb://csc301:csc123456@ds023530.mlab.com:23530/csc301";
var db;

MongoClient.connect(DB_url, {useNewUrlParser: true}, function(err, database) {
  if (err) throw err;
  console.log("Database created!");
  db = database.db("csc301");
  // db.createCollection("courses", function(err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  // });

  fs.readFile('../data/data.json','utf8', function (err, data){
	if (err) throw err;
	//console.log(data);
	var json = JSON.parse(data);
    //console.log(json.courseReviews);
	db.collection('courses').insertMany(json.courses, function(err, doc) {
	//console.log(data);
	if(err) throw err;//https:mlab.com/databases/csc301/collections/reviews?_id=UTSG-CSC104H&pageSize=10&pageNum=0&totalCount=140&
	})
   })
 //  db.collection("courses").find({"_id":{$regex:"CSC1"}}).toArray(function(err,result){
 // 	 if (err) throw err;
 // 	console.log(result);
 // 	database.close();
 // });
})
 
// let mongoDBDataModel = new  MongoDBDataModel();

// var res = [];

// res = mongoDBDataModel.getCourseData("UTM-CSC108H",function(data){
//   console.log(data);
// });
