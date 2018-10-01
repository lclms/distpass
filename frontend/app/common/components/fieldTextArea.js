angular.module('distPassApp').component('fieldtextarea', {
  bindings: {
    id: '@',
    label: '@',
    grid: '@',
    rows: '@',
    cols: '@',
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
       <textarea ng-model="$ctrl.model" id="{{ $ctrl.id }}" class="form-control"
       rows="{{ $ctrl.rows }}" cols="{{ $ctrl.cols }}" placeholder="{{ $ctrl.placeholder }}"
          ng-readonly="$ctrl.readonly"></textarea>
     </div>
   </div>
  `
});
