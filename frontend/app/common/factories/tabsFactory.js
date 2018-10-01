angular.module('distPassApp').factory('tabs', [ function() {

   function show(owner, {
      tabList = false,
      tabAdd = false,
      tabWorkSummary = false,
      tabWorkStatistic = false,
      tabAddWorkBruteForce = false,
      tabAddWorkDictionary = false
   }) {
      owner.tabList = tabList
      owner.tabAdd = tabAdd
      owner.tabWorkSummary = tabWorkSummary
      owner.tabWorkStatistic = tabWorkStatistic
      owner.tabAddWorkBruteForce = tabAddWorkBruteForce
      owner.tabAddWorkDictionary = tabAddWorkDictionary
   }

   return { show }
}])
