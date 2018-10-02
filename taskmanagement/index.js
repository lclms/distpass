var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const _ = require('lodash')


var listWords;
var work;
var workName;
var typeMode;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("db_distPass");
  var myquery = {};
  var newvalues = { $set: { wordInUse: "" } };
  dbo.collection("dictionaries").updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
    db.close();

  });

});

  io.on('connection', function (socket) {

    console.log('Hello '+ socket.id)

    socket.on('disconnect', function () {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("db_distPass");
        var myquery = { wordInUse: socket.id };
        var newvalues = { $set: { wordInUse: "" } };
        dbo.collection("dictionaries").updateMany(myquery, newvalues, function(err, res) {
          if (err) throw err;
          db.close();

        });

      });
    console.log('Bye '+socket.id)
  });

    var distJob = function distJob () {
    socket.on("getJobs", function(func) {
      //console.log('estou no get Jobs');
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("db_distPass");
        dbo.collection("dispasses").find({status: 'Ready'}).limit(1).toArray(function(err, result) {
          if (err) throw err;
          db.close();

          if(_.isEmpty(result)) {
            //console.log('NO WORKS');
            socket.emit('saveJob');

          }else {
            work = result;
            workName = work[0]['name'];

            console.log('Apanhei um trabalho')
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("db_distPass");
          console.log('Chamado '+workName);
          if(work[0]['typeAttack'] == "Dictionaries"){typeMode = "d"}else{typeMode="b"}

          //dbo.collection("diccionaries").find({$and: [ {kind: typeMode}, {wordInUse: ""}, {works: workName} ]},{_id: 0, w: 1}).limit(2000).toArray(function(err, result) {
          dbo.collection("dictionaries").find({$and: [ {wordInUse: ""}, {works: workName},{t: typeMode} ]},{_id: 0, w: 1}).limit(1).toArray(function(err, result) {

            if (err) throw err;
            //console.log(result);
            db.close();
            listWords = result;
            //console.log('3 '+result);
            //console.log(result.length)

            if(_.isEmpty(result))
            {
              console.log('acabou as palavras')
              MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("db_distPass");
                  var myquery = { name: workName };
                  var add = { $set: {status: "Not found"}};
                  dbo.collection("dispasses").updateOne(myquery, add, function(err, res) {
                    if (err) throw err;
                    //console.log(workName + " 1 document updated");
                    db.close();
                    console.log(listWords.length)
                    console.log('Vou enviar para o saveJob')
                    socket.emit('saveJob');
                  });

                });
                //socket.emit('saveJob');

            }
            else {

              var lenListWordsForJob = listWords
              //console.log(Object.values(listWords))

              var arrWordListForJob = new Array()
              for(var i = 0; i < lenListWordsForJob.length; i++)
              {
                arrWordListForJob.push(lenListWordsForJob[i].w);
              }

              console.log('dar outra lista')
              if(work[0]['startWork'] == "0") {
              //primeira tarefa ,
              MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("db_distPass");
                  var myquery = { name: workName };
                  var add = { $set: {startWork: Math.floor(Date.now() / 1000)}};
                  dbo.collection("dispasses").updateOne(myquery, add, function(err, res) {
                    if (err) throw err;
                    //console.log(workName + " 1 document updated");
                    db.close();
                  });

                });
              }

              //console.log(work[0]['_id'])
              MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("db_distPass");
                var myquery = {$and: [ {wordInUse: ""}, {works: workName} ]};
                var newvalues = { $set: { wordInUse: socket.id } };
                dbo.collection("dictionaries").updateOne(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                  //console.log(res.result.nModified + " document(s) updated");
                  db.close();


                });
                socket.emit('jobs', { words: listWords, infoWork: work });
              });


            }

          });
        });

      }
    });

      });

      });

      socket.on("sendJob", function(data) {


      returnWebWorker = JSON.stringify(data);
      var jobTime = parseInt(data.my[2][1] - data.my[2][0]);
      var lenListWords = data.my[0]

            //created a row of job data.my[3][0]
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("db_distPass");
              var myquery = {$and: [ { status: { $ne: "Success" } }, {name: workName} ]};
              var myobj = {$inc: { totalWordVerified: parseInt(data.my[4]), jobsCount: 1 }, $set: {crlTimeEndWork: Math.floor(Date.now() / 1000)}};
              dbo.collection("dispasses").updateOne(myquery, myobj, function(err, res) {
                if (err) throw err;
                console.log(res.result.nModified + " update work dispasses");
                db.close();
              });
            });


            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("db_distPass");
              var myquery = { wordInUse: socket.id };
              var newvalues = { $set: { wordInUse: "" }, $pull: { works: workName } };
              dbo.collection("dictionaries").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                  //console.log(res.result.nModified + " limpa socket da word");
                db.close();

                });
              });

              if(data.my[3][0] == "Success")
              {

                MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("db_distPass");
                  var myquery = { name: workName };
                  var myobj = {$set: { status: "Success"}};
                  dbo.collection("dispasses").updateOne(myquery, myobj, function(err, res) {
                    if (err) throw err;
                    console.log(res.result.nModified + " set sucess  work");
                    db.close();
                  });
                });

                MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  var dbo = db.db("db_distPass");
                  var myquery = { works: workName };
                  var newvalues = { $pull: { works: workName } };
                  dbo.collection("dictionaries").updateMany(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                      //console.log(res.result.nModified + " limpa socket da word");
                    db.close();

                    });
                  });

                  console.log(workName+' FIND PASSWORD')
                  socket.emit('saveJob');
              }
              else
              {
                //console.log(arrWordList)
                console.log(workName+' NOT FIND PASSWORD')
                socket.emit('saveJob');
              }

});

}
distJob ()
  });


server.listen(8080, () => console.log('SOCKET...'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  //console.log(text);
});

app.get('/demo_workers', function (req, res) {
  res.sendFile(__dirname + '/demo_workers.js');
});
