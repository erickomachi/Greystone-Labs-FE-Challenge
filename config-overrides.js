const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

// config-overrides.js
module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  config = rewireAliases.aliasesOptions({
    '@': path.resolve(__dirname, `${paths.appSrc}/`),
		'@components': path.resolve(__dirname, `${paths.appSrc}/components/`),
    '@utils': path.resolve(__dirname, `${paths.appSrc}/utils/`),
    '@pages': path.resolve(__dirname, `${paths.appSrc}/pages/`),
    
	})(config, env);
  
  return config
}