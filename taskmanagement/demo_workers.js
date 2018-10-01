self.importScripts('/socket.io/socket.io.js');
self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/sha256.js');
self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/sha512.js');

var socket = io.connect('http://192.168.2.10:8080',{'forceNew':true});

function runjob(){


  socket.on('saveJob', function () {
    socket.emit("getJobs");
  });


socket.emit("getJobs");

socket.on('jobs', function (data) {

  //console.log(data);
  var wordListReceipt = data.words;

  if(wordListReceipt) {
  var workInfoReceipt = data.infoWork;
  var typePassword = workInfoReceipt[0]['typePassword'];
  var userAgent = navigator.userAgent;
  var jobBegin = Date.now();
  var sucess = 'Ready';
  var passFind = 0;


  //console.log(jobBegin);
  //console.log(passFind);
  //console.log(workInfoReceipt);
  //console.log(wordListReceipt[0]['w'][1]);
  //console.log("PASS: "+workInfoReceipt[0]['passwordProvided']);

   if(typePassword == "SHA256"){

      for(var passAnalise = 0; passAnalise < wordListReceipt[0]['w'].length; passAnalise++)
      {


        if((CryptoJS.SHA256(wordListReceipt[0]['w'][passAnalise])) == workInfoReceipt[0]['passwordProvided'])
        {
          console.log(CryptoJS.SHA256(wordListReceipt[0]['w'][passAnalise]) + " - " + workInfoReceipt[0]['passwordProvided']);
          sucess = "Success";
          passFind = passAnalise;

        }

      }
    }
      else if(typePassword == "SHA512"){

        for(var passAnalise = 0; passAnalise < wordListReceipt[0]['w'].length; passAnalise++)
        {
          if((CryptoJS.SHA512(wordListReceipt[0]['w'][passAnalise])) == workInfoReceipt[0]['passwordProvided'])
          {
            console.log(CryptoJS.SHA512(wordListReceipt[0]['w'][passAnalise]) + " - " + workInfoReceipt[0]['passwordProvided']);
            sucess = "Success";
            passFind = passAnalise;

          }

        }

  }else {

    for(var passAnalise = 0; passAnalise < wordListReceipt[0]['w'].length; passAnalise++)
    {
      if(wordListReceipt[0]['w'][passAnalise] == workInfoReceipt[0]['passwordProvided'])
      {
        console.log(wordListReceipt[0]['w'][passAnalise] + " - " + workInfoReceipt[0]['passwordProvided']);
        sucess = "Success";
        passFind = passAnalise;

      }

    }

  }



  //console.log(sucess);
  var jobEnd = Date.now();
  //console.log(jobEnd);

  var timesJob = [jobBegin, jobEnd];
  var result = [sucess];
  var pA = [passAnalise];
  //var client = [navigator.userAgent];
  var client = [""];

//console.log(idWork);

socket.emit('sendJob', { my: [wordListReceipt, workInfoReceipt, timesJob, result, pA, client] });

}


});

}
self.runjob();
