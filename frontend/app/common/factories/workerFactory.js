
angular.module('distPassApp').factory('HelloWorldService', [
    '$q',
    workFactory
  ])
  
  function workFactory($q) {
    
    var worker = undefined

    
    
    return {
        startWork: function(postData) {
            var defer = $q.defer();
            console.log(worker)
            if (worker) {
                worker.terminate();
            }
            
            //var worker = new Worker('doWork.js');
            var blobURL = URL.createObjectURL(new Blob([
                "var i = 0;function countNumbers(){if(i < 100000){i = i + 1;postMessage(i);}setTimeout('countNumbers()', 500);}countNumbers();"
            ], { type: 'application/javascript' }));
            worker = new Worker(blobURL)

            worker.addEventListener('message', function(e) {
            console.log('Worker said: ', e.data);
            defer.resolve(e.data);
            return worker.postMessage(e.data); // Send data to our worker.
            }, false);

            
            
        },
        stopWork: function() {
            console.log(worker)
            if (worker) {
                worker.terminate();
            }
        },
        doWork : function(myData){
            defer = $q.defer();
            worker.postMessage(myData); // Send data to our worker. 
            return defer;
        }
    }
  }
  