
exports.config = {

    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    specs: [
        'e2e/**/*.spec.js'
    ],
    capabilities: {
        browserName: 'firefox',
        version: '',
        platform: 'ANY'
    },
    baseUrl: 'http://127.0.0.1:9000/',
    rootElement: 'body',
    allScriptsTimeout: 11000,
    onPrepare: function () {
    },
    jasmineNodeOpts: {
        onComplete: function () {
        },
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    }
};