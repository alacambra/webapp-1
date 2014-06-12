(function () {
    'use strict';
    angular.module('frontendPrototypeApp')
        .filter("reverse", function () {
            return function (items) {
                return items.slice().reverse();
            };
        })
        .filter('highlight', function () {
            var findAll = function (text, search) {

                var matches = [];
                var find = function (text, key) {
                    var helperString = text.toLowerCase(),
                        keyHelper = key.toLowerCase(),
                        matches = [],
                        lastMatch = helperString.indexOf(keyHelper);
                    while (lastMatch !== -1) {

                        matches.push([lastMatch - helperString.length + text.length, key.length]);
                        helperString = helperString.substring(lastMatch + key.length);
                        lastMatch = helperString.indexOf(keyHelper);
                    }

                    return matches;
                };
                var getUnion = function (items) {
                    var unionHelper = [], union = [];
                    for (var i = 0, ii = items.length; i < ii; i++) {
                        for (var j = 0, jj = items[i][1]; j < jj; j++) {
                            unionHelper[items[i][0] + j] = true;
                        }
                    }

                    var firstIndex = -1, length = 0;
                    for (var i = 0, ii = unionHelper.length + 1; i < ii; i++) {
                        if (unionHelper[i]) {
                            if (firstIndex === -1) {
                                firstIndex = i;
                            }
                            length++;
                        } else {
                            if (firstIndex !== -1) {
                                union.push([firstIndex, length]);
                                firstIndex = -1;
                                length = 0;
                            }
                        }
                    }

                    return union;
                };
                var searchArray = search ? search.split(" ") : [];
                for (var i = 0, ii = searchArray.length; i < ii; i++) {
                    if (searchArray[i] !== "") {
                        var caseMatches = find(text, searchArray[i]);
                        for (var j = 0, jj = caseMatches.length; j < jj; j++) {
                            matches.push(caseMatches[j]);
                        }
                    }
                }

                return getUnion(matches.sort(function (a, b) {
                    return a[0] - b[0];
                }));
            };
            var wrapWithTag = function (text, tag, substrs) {
                var textHelper = text;
                var offset = 0;
                for (var i = 0, ii = substrs.length; i < ii; i++) {
                    textHelper = textHelper.substr(0, substrs[i][0] + offset) + "<" + tag + " class='search-match'>" + textHelper.substr(substrs[i][0] + offset, substrs[i][1]) + "</" + tag + ">" + textHelper.substr(substrs[i][0] + offset + substrs[i][1]);
                    offset = offset + 30 + tag.length;
                }
                return textHelper;
            };
            return function (text, search) {
                return wrapWithTag(text, "span", findAll(text, search));
            };
        })
        .filter('softFilter', ['Resource', function (Resource) {
                return function (items, search) {
                    var filtered = [];
                    angular.forEach(items, function (item) {
                        var searchKeys = (search || "").split(" ") || [];
                        var wordsFound = 0;
                        angular.forEach(searchKeys, function (key) {
                            if ((item.resourceId ? Resource.get(item.resourceId).title : "").toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                                wordsFound = wordsFound + 1;
                            }

                        });
                        if (wordsFound === searchKeys.length) {
                            filtered.push(item);
                        }
                    });
                    return filtered;
                };
            }])
        .filter('madeBy', function () {
            return function (items, user) {
                if (!user || !(user.length > 0))
                    return items;
                var filtered = [];
                angular.forEach(items, function (item) {
                    if (item.creator === user)
                        filtered.push(item);
                });
                return filtered;
            };
        })
        .filter('range', function () {
            return function (input, total) {
                total = parseInt(total, 10);
                for (var i = 0; i < total; i++)
                    input.push(i);
                return input;
            };
        })
        .filter('unsafe', function ($sce) {
            return function (val) {
                return $sce.trustAsHtml(val);
            };
        })
        .filter('breakFilter', function () {
            return function (text) {
                if (text !== undefined)
                    return text.replace(/\n/g, '<br />');
            };
        });

}());