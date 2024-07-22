// NOTES
// 1. All source files must reference ONLY this config file. Not the env specific config files.
// 2. In this file we choose WHICH environment config to load.
// 3. Do NOT ADD ANY config to this file!!!
//  a. for config common to multiple environments, use application.config.common.js
//  b. for config specific to 1 environment, use env/application.config.<environment>.js
//  c. for config that depends on other config values, use application.config.common.derived.js


// Load the config that is common across all environments.
var AppConfig = require('./application.config.common');


// Specify which environment config to load.
var nodeEnv = "dev-2" // process.env.NODE_ENV || "development" || "localhost";


// Load config for specified environment
var env_config = require('./env/application.config.' + nodeEnv);

env_config( AppConfig );


// Add the derived config values. Note that this must be done _after_
// the rest of the config values are defined above.
var derive_config = require('./application.config.common.derived');

derive_config( AppConfig );

// console.log(AppConfig);

module.exports = AppConfig;
