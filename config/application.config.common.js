// Load default config for all environments
// Note: these values can be overridden in env specific config files.

var AppConfig = {};

AppConfig.aws = {
	options: {
		region: "us-east-1",
		accessKeyId: "",
		secretAccessKey: "",
		apiVersion: "latest"
	},
}

AppConfig.cognito = {
    cognito_host: '@cognito_host@',
    cognito_app_client_id: '@cognito_app_client_id@',
    cognito_pool_id: '@cognito_pool_id@',  
}

// The Odyssey backend service for this environment.
AppConfig.svc = '@AppConfig.svc@'

AppConfig.cognito.urls = {
	// There are two login flows implemented:
    //  /login will do simple credentials --> tokens flow (implicit grant).
    //  /login/code will do code flow (authorization code grant).

	odyssey_login_path: '/login/code',

	// Note: these URL's must be configured in Cognito -> App Integration -> App client -> Hosted UI callback
	// 	and signout URL's.
	cognito_app_redirect_path: '@cognito_app_redirect_path@',
	cognito_app_redirect_logout_path: '@cognito_app_redirect_logout_path@',
}

module.exports = AppConfig;