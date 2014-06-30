(function (ng) {
    "use strict";

    var app = ng.module("App", []);

    app.controller('AppCtrl', function ($scope) {
        $scope.selectedtags = "Mr. White, J. Pinkman";
//        $scope.selectedtags = ['Mr. White', 'J. Pinkman'];
//        $scope.autocompletetokens = "!!!, red, blue, green, yellow, violet, brown, purple, black, white";
        $scope.autocompletetokens = ['!!!', 'red', 'blue', 'green', 'yellow', 'violet', 'brown', 'purple', 'black', 'white'];
    });


    app.directive('tokenfield', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                autotokens: "="
            },
            link: function (scope, element, attrs, ngModel) {

                // when the model changes, the tokens are added
                scope.$watch(
                    function () {
                        return ngModel.$modelValue;
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
                        if (newVal != oldVal) {
                            element.tokenfield('destroy');
                            init(ngModel.$modelValue);
                        }
                    });

                // init function prepare config and initialise tokenfield
                function init(tokensStr) {
                    // get array of autocomplete tokens
                    var autocompleteArr = (scope.autotokens || [])
                        .map(function (e) {
                            return e.trim();
                        })
                        .filter(function (e) {
                            return !!e;
                        });

                    element.tokenfield({
                        autocomplete: {
                            source: autocompleteArr
                        },
                        showAutocompleteOnFocus: true,
                        // get tokens from value string
                        tokens: tokensStr || ngModel.$modelValue,
                        createTokensOnBlur: true
                    });
                }

                // init jQuery control 'tokenfield'
                init();
            }
        }
    });

})(angular);
