(function () {
	'use strict';

	var ENTER_KEY = 13;

	var dependencies = [
		'poolingpeopleAppFilter'
	];

	angular.module('poolingpeopleAppDirective', dependencies)

		.directive('ppModel', ['$log',
			function ($log) {
				return {
					restrict: 'A',
					priority: 1,
					require: 'ngModel',
					link: function ($scope, $elem, $attrs, ngModelCtrl) {
						// the update function
						var update = function () {
							$scope.$apply(function () {
								ngModelCtrl.$setViewValue($elem.val().trim());
								ngModelCtrl.$render();
							});
						};

						// remove events used by ngModel
						$elem.off('change').off('input').off('keydown');

						// update model on blur
						$elem.on('blur', update);

						// update model on enter key
						$elem.bind('keydown', function (event) {
							if (event.which === ENTER_KEY) {
								update();
							}
						});

						// clean up when model is destroyed
						$elem.on('$destroy', function (event) {
							$elem.off('blur');
							$elem.off('keydown');
						});
					}
				};
			}])

		.directive('ppConvertDate', ['$filter', '$log',
			function ($filter, $log) {
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function ($scope, $elem, $attrs, ngModelCtrl) {
						ngModelCtrl.$formatters.push(function (modelValue) {
							if (_.isNull(modelValue)) {
								return null;
							}
							return $filter('date')(modelValue, 'dd.MM.yyyy');
						});

						ngModelCtrl.$parsers.push(function (viewValue) {
							if (_.isUndefined(viewValue) || _.isNull(viewValue)) {
								return null;
							}
							return moment(viewValue).valueOf();
						});
					}
				};
			}])

		/*
		THIS DIRECTIVE IS NOT FINISHED - CUSTOM VALIDATION EXAMPLE by TS-2014-02-19
		 */
		.directive('ppValidateDate', ['$filter', '$log',
			function ($filter, $log) {
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function ($scope, $elem, $attrs, ngModelCtrl) {
						var min = $attrs.min || null,
							max = $attrs.max || null,
							validate = function (value) {
								var validMin = _.isNull(min) || moment(min, 'yyyy-MM-dd').valueOf() - value <= 0,
									validMax = _.isNull(max) || moment(max, 'yyyy-MM-dd').valueOf() - value >= 0;

								ngModelCtrl.$setValidity('min', validMin);
								ngModelCtrl.$setValidity('max', validMax);

								return validMin && validMax ? value : null;
							};

						ngModelCtrl.$formatters.unshift(function (modelValue) {
							return validate(modelValue);
						});

						ngModelCtrl.$parsers.unshift(function (viewValue) {
							return validate(moment(viewValue).valueOf());
						});
					}
				}
			}])

		.directive('ppConvertTime', ['$filter', '$log',
			function ($filter, $log) {
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function ($scope, $elem, $attrs, ngModelCtrl) {
						ngModelCtrl.$formatters.push(function (modelValue) {
							var hours = $filter('minutesToHours')(modelValue);
							return $filter('number')(hours, 2);
						});

						ngModelCtrl.$parsers.push(function (viewValue) {
							return $filter('hoursToMinutes')(viewValue);
						});
					}
				};
			}])

		.directive('ppConvertPercent', ['$filter', '$log',
			function ($filter, $log) {
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function ($scope, $elem, $attrs, ngModelCtrl) {
						ngModelCtrl.$formatters.push(function (modelValue) {
							return modelValue * 100;
						});

						ngModelCtrl.$parsers.push(function (viewValue) {
							return $filter('number')(viewValue / 100, 4);
						});
					}
				};
			}])

		.directive('setFocus', ['$log',
			function ($log) {
				return {
					restrict: 'A',
					link: function ($scope, $elem, $attrs) {
						$elem.focus();
					}
				}
			}])
		.directive('ngEnter', function () {
		    return function (scope, element, attrs) {
		        element.bind("keydown keypress", function (event) {
		            if(event.which === 13) {
		                scope.$apply(function (){
		                    scope.$eval(attrs.ngEnter);
		                });

		                event.preventDefault();
		            }
		        });
		    };
		})
		.directive('ngLoading', function (LoadStatusService) {
		  return {
		    priority: 100,
		    restrict: 'A',
		    link: function ($scope, $element, $attr) {
		    	var doContrary = $attr.ngLoading.indexOf("!") === 0,
		    		targetResource = doContrary ? $attr.ngLoading.substr(1) : $attr.ngLoading;

			    	$scope.$watch(function() {
		    		if (LoadStatusService.isLoading(targetResource)) {
		    			if (!doContrary) $element.show();
		    			else $element.hide();
		    		} else {
		    			if (doContrary) $element.show();
		    			else $element.hide();
		    		}
		    	}, true);
		    }
		  };
		});
}());