(function () {

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
        $scope.selectedtags = "white,pink";
    });


    app.directive('tokenfield', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                scope.$watch(
                    function () {
                        return ngModel.$modelValue;
                    },
                    function (newVal, oldVal) {
                        if (newVal.trim().charAt(newVal.length - 1) != ',')
                            element.tokenfield('setTokens', newVal);
                    });

                var trimmer = function (e) {
                    return e.trim();
                };
                // get tokens from value string
                var value = attrs.value.split(',').map(trimmer);
                // get array of autocomplete tokens as array
                var autotokens = attrs.autotokens.split(',').map(trimmer);

                element
                    .tokenfield({
                        autocomplete: {
                            source: autotokens,
                            delay: 100
                        },
                        showAutocompleteOnFocus: true,
                        tokens: value,
                        createTokensOnBlur: true
                    });
            }
        }
    });

})();
