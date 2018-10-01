const _ = require('lodash')
const DistPass = require('./distPass')


DistPass.methods(['get', 'post', 'put', 'delete'])


DistPass.updateOptions({new: true, runValidators: true})

DistPass.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

DistPass.route('count', function(req, res, next) {
  DistPass.count(function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

DistPass.route('teste', function(req, res, next) {
  res.send('<h1>Teste!</h1>')
})

//add work in the collection dictionaries

const dictionaries = require('./dictionaries')

const express = require('express')
const server = express()

const allowCors = require('./cors')
server.use(allowCors)

server.put('/addwork/:name/:min/:max/', function(req, res, next) {
  dictionaries.updateMany(  
    // { $and: [{ l: { $gte: req.params.min, $lte: req.params.max }}, { kind: req.params.kind}] },
    { $and: [{ l: { $gte: req.params.min, $lte: req.params.max }}] },
    { $push: { works: req.params.name } },

    // callback function
    (err, v) => {
      console.log('ENTROU AQUI!')
        if (err) return res.status(200).send(err)
        return res.status(200).send(v)
    }
    
);
/*
var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  var sgcount;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("db_distPass");
    dbo.collection("dicionaries").find({ $and : [{kind: 'D', length: { $gte: parseInt(req.params.min), $lte: parseInt(req.params.max) } }]}).count(function (e, count) {
      sgcount = count
      
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("db_distPass");
        var myquery = { name: req.params.name };
        var newvalues = { $set: {totalWordsAvailable: sgcount } };
        dbo.collection("dispasses").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          //console.log("1 document updated");
          db.close();
        });
      })

      });

  });
*/
})
/*
server.get('/sgwork/:name/:min/:max', function(req, res, next) {

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  var sgcount;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("db_distPass");
    dbo.collection("dicionaries").find({ $and : [{kind: 'dictionary', length: { $gte: parseInt(req.params.min), $lte: parseInt(req.params.max) } }]}).count(function (e, count) {
      res.json(count)
      });

  });
  
})

server.get('/createworke/:name/:min/:max/:charset', function(req, res, next) {

       var segment = new Array();	
       for(var i = req.params.min; i <= req.params.max; i++){
        segment.push(i)
        }
       
        var chatSet = req.params.charset;
        var totalCaracters = chatSet.length;
        
        for(var s =0; s < segment.length; s++) {
        
        // ### document.write("Segmento "+s+"<br>");
        var numSegment = segment[s];
        var numUpset = Math.pow(totalCaracters,numSegment);
        var numRepet = 1;
        
        for(k=0; k < numSegment; k++) {
          
          //other columns
          numRepet = 1;
          do {
            for (var i = 0; i < chatSet.length; i++) {
            
              for (var j = 0; j < Math.pow(totalCaracters,k); j++) {
              // ## document.write(chatSet.charAt(i)+"<br>");
              numRepet++;
              }
            }
          }while (numRepet <= numUpset);	
            
          // ### document.write("<hr>");
          }

        }
  

})
*/
server.listen(3000, () => console.log('Add work...'))


    








module.exports = DistPass
