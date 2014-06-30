(function () {
    "use strict";

    $('#tokenfield-1').tokenfield({
        autocomplete: {
            source: ['red', 'blue', 'green', 'yellow', 'violet', 'brown', 'purple', 'black', 'white'],
            delay: 100
        },
        showAutocompleteOnFocus: true,
        tokens: ['black', 'white'],
        createTokensOnBlur: true
    });

    var app = angular.module("App", []);

    app.controller('AppCtrl', function ($scope) {
        $scope.selectedtags = "Mr. White, J. Pinkman";
        $scope.autocompletetokens = "!!!, red, blue, green, yellow, violet, brown, purple, black, white";
    });


    app.directive('tokenfield', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                autotokens: "@"
            },
            link: function (scope, element, attrs, ngModel) {

                console.log(ngModel.$modelValue);
                console.log(ngModel['$viewValue']);
                // when the model changes, the tokens are added
                scope.$watch(
                    function () {
                        return ngModel.$modelValue;
                    },
                    function (newVal, oldVal) {
                        var trim = newVal.trim();
                        console.log("->" + trim);
                        if (//newVal != oldVal &&
                            trim.charAt(trim.length - 1) != ',')
                            element.tokenfield('setTokens', trim);
                    });

                // when the autotokens list changes, the tokenfield is reset to change autocomplete list
                scope.$watch(
                    function () {
                        return scope.autotokens;
                    },
                    function (newVal, oldVal) {
                        if (newVal != oldVal) {

                            console.log("<-" + newVal);

                            element.tokenfield('destroy');
                            init(ngModel.$modelValue);
                        }
                    });

                // init function prepare config and initialise tokenfield
                function init(tokensStr) {
                    // get tokens from value string
//                    if (!tokensStr) tokensStr = attrs.value;
                    if (!tokensStr) {

                        console.log(ngModel);
                        console.log(ngModel.$modelValue);
                        tokensStr = ngModel.$modelValue;
                    }
                    // get array of autocomplete tokens
                    var autocompleteArr = scope.autotokens
                        .split(',')
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
                        tokens: tokensStr,
                        createTokensOnBlur: true
                    });
                }

                // init jQuery control 'tokenfield'
                scope.$evalAsync(function () {
                    console.log(ngModel);
                    init()
                });
            }
        }
    });

})();
