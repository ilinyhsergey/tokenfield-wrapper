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
    app.directive('tokenfield', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var id = attrs.id;
                var trimmer = function (e) {
                    return e.trim();
                };
                var value = attrs.value.split(',').map(trimmer);
                var autotokens = attrs.autotokens.split(',').map(trimmer);

                $('#' + id).tokenfield({
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
