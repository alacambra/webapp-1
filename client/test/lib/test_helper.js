(function () {

    require([
        'jquery',
        'tools',
        'backbone_basicauth',
        'locales/en',
        'locales/de'
    ], function ($) {
        // Add div#sandbox to body
        $('body').append('<div id="sandbox" style="overflow: hidden; height: 1px;"></div>');
    });
}());
