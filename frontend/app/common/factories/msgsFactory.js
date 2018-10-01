angular.module('distPassApp').factory('msgs', [
  'toastr',
  MsgsFactory
])

function MsgsFactory(toastr) {
  function addSuccess(msgs) {
    addMsg(msgs, 'Sucess', 'success')
  }

  function addError(msgs) {
    addMsg(msgs, 'Error', 'error')
  }

  function addMsg(msgs, title, method) {
    if(msgs instanceof Array) {
      msgs.forEach(msg => toastr[method](msg, title))
    } else {
      toastr[method](msgs, title)
    }
  }

  return { addSuccess, addError }
}
