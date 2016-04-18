module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        files: [
            '._tmp/**/*.js',
            { pattern: 'public/vendor/*.js', watched: false },
            {pattern: 'public/**/*.html', included: false, served: false}
        ]
    });
};