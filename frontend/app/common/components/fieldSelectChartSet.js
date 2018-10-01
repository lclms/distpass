angular.module('distPassApp').component('fieldselectchartset', {
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
         <select ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control">
         <option value="">Select a Charset</option>
         <option value="all">All</option>
         <option value="i">numeric</option>
         <option value="s">alphanumeric</option>
         <select>
       </div>
     </div>
    `
  });
  