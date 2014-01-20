(function () {

    require([
        'jquery',
        'tools',
        'backbone_basicauth',
        'locales/en',
        'locales/de'
    ], function ($) {
        console.log('~~~~~~~~ preparing environment for testing ~~~~~~~~');

        console.log('Adding sandbox to body.');
        $('body').append('<div id="sandbox" style="overflow: hidden; height: 1px;"></div>');

        console.log('~~~~~~~~ environment for tests is prepared ~~~~~~~~');
    });
}());
