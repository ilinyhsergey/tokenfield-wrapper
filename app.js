(function (ng) {
    "use strict";

    var app = ng.module("App", []);

    app.controller('AppCtrl', function ($scope) {
        $scope.selectedtags = ['Mr.', 'White', 'J.', 'Pinkman'];
        $scope.autocompletetokens = ['!!!', 'red', 'blue', 'green', 'yellow', 'violet', 'brown', 'purple', 'black', 'white'];

    });


    app.directive('tokenfield', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                autotokens: "="
            },
            link: function (scope, element, attrs, ngModelCtrl) {

                ngModelCtrl.$parsers.push(function (viewValue) {
                    if (ng.isString(viewValue)) viewValue = viewValue.split(',');

                    return viewValue.map(function (e) {
                        return e.trim();
                    }).filter(function (e) {
                        return !!e;
                    });
                });


                // when the model changes, the tokens are added
                scope.$watch(
                    function () {
                        return ngModelCtrl.$modelValue;
                    },
                    function (newVal, oldVal) {
                        if (newVal != oldVal) {
                            element.tokenfield('setTokens', newVal, false, false);
                        }
                    });

                // when the autotokens list changes, the tokenfield is reset to change autocomplete list
                scope.$watch(
                    function () {
                        return scope.autotokens;
                    },
                    function (newVal, oldVal) {
                        var autotokens = newVal || [];

                        if (ng.isArray(autotokens)) {
                            // do not nothing
                        } else if (ng.isString(autotokens)) {
                            // parse string
                            autotokens = autotokens.split(',');
                        } else if (ng.isObject(autotokens)) {
                            // parse object
                            var res = [];
                            ng.forEach(autotokens, function (value, key) {
                                if (value) res.push(key);
                            });
                            autotokens = res;
                        } else {
                            throw 'Not appropriate autocomplete source for "tokenfield"';
                        }

                        var autocompleteSource = autotokens.map(function (e) {
                            return e.trim();
                        }).filter(function (e) {
                            return !!e;
                        });

                        element.tokenfield('destroy');
                        element.tokenfield({
                            autocomplete: {
                                source: autocompleteSource
                            },
                            showAutocompleteOnFocus: true,
                            tokens: ngModelCtrl.$modelValue || [],
                            createTokensOnBlur: true
                        });
                    });

            }
        }
    });

})(angular);
