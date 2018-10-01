angular.module('distPassApp').factory('SocketIOService', [ function() {

    function runSocket() {
      
        var socket = io.connect('http://localhost:9000');
  socket.on('news', function (data) {
    //console.log(data);

    var w;
    
    function startWorker() {
        if(typeof(Worker) !== "undefined") {
            if(typeof(w) == "undefined") {


                //var worker = new Worker('doWork.js');
            var blobURL = URL.createObjectURL(new Blob([
                "self.addEventListener('message', function(e) { console.log(e.data.task['wordsToTest']); self.postMessage('t'); }, false);"
            ], { type: 'application/javascript' }));
            w = new Worker(blobURL)


                w.addEventListener('message', function(e) {
                  socket.emit('my other event', { my: e.data });
                }, false);
                w.postMessage(data); // Send data to our worker.
            }
            else
            {
                io.emit('end');
                w.terminate();
            }

        } else {
          socket.emit('my other event', { my: "Sorry, your browser does not support Web Workers..." });
        }
    }

    return startWorker();


  });


    }
 
    return { runSocket }
 }])
 