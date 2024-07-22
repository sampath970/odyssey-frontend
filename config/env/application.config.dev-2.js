// A config file for one environment.

function env_config( AppConfig ) {
    AppConfig.clarity_key = '@AppConfig.clarity_key@';

    // The Odyssey frontend application for this environment.
    AppConfig.frontend = '@AppConfig.frontend@';

    // The Odyssey backend service for this environment.
    AppConfig.svc = '@AppConfig.svc@'

}

module.exports = env_config;