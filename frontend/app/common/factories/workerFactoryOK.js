/*
angular.module('distPassApp').factory('HelloWorldService', [
    '$q',
    workFactory
  ])
  
  function workFactory($q) {
    
    //var worker = new Worker('doWork.js');
    var blobURL = URL.createObjectURL(new Blob([
        "var i = 0;function countNumbers(){if(i < 100000){i = i + 1;postMessage(i);}setTimeout('countNumbers()', 500);}countNumbers();"
    ], { type: 'application/javascript' }));
    var worker = new Worker(blobURL)

    var defer = $q.defer();
    worker.addEventListener('message', function(e) {
      console.log('Worker said: ', e.data);
      defer.resolve(e.data);
    }, false);

    return {
        doWork : function(myData){
            defer = $q.defer();
            worker.postMessage(myData); // Send data to our worker. 
            return defer;
        }
    }
  }
  */