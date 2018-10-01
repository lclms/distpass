angular.module('distPassApp').component('fieldselecthash', {
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
         <option value="">Select a type</option>
         <option value="Clear Text">Clear Text</option>
         <option value="SHA256">SHA256</option>
         <option value="SHA512">SHA512</option>
         <select>
       </div>
     </div>
    `
  });
  