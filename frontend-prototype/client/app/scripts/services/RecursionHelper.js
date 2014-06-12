(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
        .factory('RecursionHelper', ['$compile', function ($compile) {
                return {
                    /**
                     * Manually compiles the element, fixing the recursion loop.
                     * @param element
                     * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
                     * @returns An object containing the linking functions.
                     */
                    compile: function (element, link) {

                        if (angular.isFunction(link)) {
                            link = {post: link};
                        }
                        ;
                        var contents = element.contents().remove(),
                            compiledContents;
                        return {
                            pre: (link && link.pre) ? link.pre : null,
                            post: function (scope, element) {
                                // Compile the contents
                                if (!compiledContents) {
                                    compiledContents = $compile(contents);
                                }
                                // Re-add the compiled contents to the element
                                compiledContents(scope, function (clone) {
                                    element.append(clone);
                                });
                                // Call the post-linking function, if any
                                if (link && link.post) {
                                    link.post.apply(null, arguments);
                                }
                            }
                        };
                    }
                };
            }])
}());