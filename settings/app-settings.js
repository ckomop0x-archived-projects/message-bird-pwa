const path = require('path');

module.exports = {
    title: 'Message Bird Application',
    viewport: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover',
    font: '<link href="https://fonts.googleapis.com/css?family=Exo+2|Roboto" rel="stylesheet">',
    filename: 'index.html',
    template: path.resolve(__dirname, './../src/views/index.ejs')
};