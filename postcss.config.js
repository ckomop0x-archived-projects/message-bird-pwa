module.exports = function getPostCssConfig() {
    return {
        plugins: [
            require('autoprefixer')
        ]
    };
};
