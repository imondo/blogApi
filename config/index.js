const build = require('./build.config');
const dev = require('./dev.config');

module.exports = process.env.NODE_ENV === 'development' ? dev : build;