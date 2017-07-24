module.exports = function() {

    var config = {
        scss: {
            input: './src/scss/**/*.scss',
            base: './src/scss/style.scss',
            output: '../css/'
        },
        js: {
            input: './src/js/**/*.js',
            base: './src/js/app.js',
            output: '../js/'
        },
        options: {
            scss: {
                errLogToConsole: true,
                outputStyle: 'compressed'
            },
            autoprefixer: {
                browsers: ['last 3 versions']
            }
        }
    };

    return config;
};
