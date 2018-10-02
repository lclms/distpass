(function() {
angular.module('distPassApp').controller('WorkCtrl', [
  '$http',
  'msgs',
  'tabs',
  'HelloWorldService',
  WorkController
])

function WorkController($http, msgs, tabs, HelloWorldService) {

    const vm = this
    const url = 'http://localhost:3003/api/distPass'
    const urlDic = 'http://localhost:3000/addwork'
    //const urlsgDic = 'http://localhost:3000/sgwork'

    
    //const word = new Array()

    vm.refresh = function()
    {
      $http.get(url).then(function(resp){
        vm.distPasss = resp.data
        vm.distPass = {}
        tabs.show(vm, {tabList: true, tabAdd: true})


      })
    }

    vm.createD = function() {

      
      vm.distPass.created = Date.now()
      vm.distPass.status = 'Ready'
      vm.distPass.t = "d"
      //const urlsgDicUrl = `${urlsgDic}/${vm.distPass.lengthMin}/${vm.distPass.lengthMax}`
      //$http.get(urlsgDic).then(function(response) {/*vm.distPass.totalWordsAvailable = parseInt(response)*/ console.log(response)})

      const checkUrl = `${url}/?name=${vm.distPass.name}`
        const addWorkUrl = `${urlDic}/${vm.distPass.name}/${vm.distPass.lengthMin}/${vm.distPass.lengthMax}/${vm.distPass.t}/${vm.distPass.charset}`
      //console.log(addWorkUrl) 
      $http.get(checkUrl).then(function(resp){

          if(!resp.data[0]){           
            console.log(vm.distPass.totalWordsAvailable)
              vm.distPass.typeAttack = "Dictionaries"
            $http.post(url, vm.distPass).then(function(response) {

              $http.put(addWorkUrl)
              vm.refresh()
              msgs.addSuccess('Register successful')
            }).catch(function(resp) {
              msgs.addError(resp.data.errors)
            })

          }else
          {
            msgs.addError('Already exists a job with the indicated name')
            vm.refresh()
          }

        })
        
      }
      vm.createBF = function() {   
        vm.distPass.created = Date.now()
        vm.distPass.status = 'Ready'
        vm.distPass.t = "b"

        //const addWorkUrl = `${urlDic}/${vm.distPass.name}/${vm.distPass.lengthMin}/${vm.distPass.lengthMax}/B`
        console.log(vm.distPass.charset)
        
        const addWorkUrl = `${urlDic}/${vm.distPass.name}/${vm.distPass.lengthMin}/${vm.distPass.lengthMax}/${vm.distPass.t}/${vm.distPass.charset}`

        const checkUrl = `${url}/?name=${vm.distPass.name}`
          $http.get(checkUrl).then(function(resp){
  
            if(!resp.data[0]){
              vm.distPass.typeAttack = "Brute Force"
              $http.post(url, vm.distPass).then(function(response) {
                $http.put(addWorkUrl)
                vm.refresh()
                msgs.addSuccess('Register successful')
              }).catch(function(resp) {
                msgs.addError(resp.data.errors)
              })
  
            }else
            {
              msgs.addError('Already exists a job with the indicated name')
              vm.refresh()
            }
  
          })
          
        }
     
      vm.delete = function () {
        const deleteUrl = `${url}/${vm.distPass._id}`
        $http.delete(deleteUrl, vm.distPass).then(function(response){

          vm.refresh()
          msgs.addSuccess('Successful')
        }).catch(function(resp) {
          msgs.addError(resp.data.errors)
        })
      }

      vm.showTabSummaryWork = function(distPass) {

        vm.distPass = distPass
        
        tabs.show(vm, {tabWorkSummary: true, tabWorkStatistic: true})
      }

      vm.funtestar = function() {

        
          var ifrm = document.createElement("iframe");
          ifrm.setAttribute("src", "http://localhost:8888/grafico/graf.html");
          ifrm.style.width = "640px";
          ifrm.style.height = "480px";
          ifrm.frameBorder = "0";
          document.getElementById('frm').appendChild(ifrm);
      
      }

      vm.showTabAddWork = function(type) {

        if(type == 'BF')
        tabs.show(vm, {tabAddWorkBruteForce: true})

        if(type == 'D')
        tabs.show(vm, {tabAddWorkDictionary: true})
      }
      
      vm.StartWorker = function() {

        HelloWorldService.startWork()
      }
      vm.StopWorker = function() {

        HelloWorldService.stopWork()
      }
      
      
      vm.refresh()
     }
})()
 
