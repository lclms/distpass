angular.module('distPassApp').component('fieldselectnumber', {
    bindings: {
      id: '@',
      label: '@',
      type: '@',
      grid: '@',
      model: '=',
      placeholder: '@',
      readonly: '<'
    },
    controller: [
      'gridSystem',
      function(gridSystem) {
        this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
      }
    ],
    template: `
    <div class="{{ $ctrl.gridClasses }}">
    <div class="form-group">
      <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
      <select ng-init="names=['1','2','3','4','5','6','7','8','9','10','11','12']" ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control">
      <option value="">Select a number</option>
      <option ng-repeat="x in names" value="{{ x }}">{{ x }}</option>
      
      <select>
    </div>
  </div>
    `
  });
  