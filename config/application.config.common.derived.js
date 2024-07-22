// Load config values that are derived from other config values.

// Note: there should be NO simple key:value items here - we only want items
//	that are _derived_ from simple key:value items.
//	I.e. my_path: '/here'	<-- bad, this should be in common or env specific config.
//	E.g. my_path: `/here/${AppConfig.my_variable}`	<-- good, this belongs here.

function deriveConfig( AppConfig ) {

	var urls = AppConfig.cognito.urls;

	// Our URL's that must be configured in Cognito -> App Integration -> App client -> Hosted UI.
	// Callback and signout URL's.
    urls.cognito_app_redirect_path = `${AppConfig.frontend}/login`;
    urls.cognito_app_redirect_path_code = `${AppConfig.frontend}/login/code`;
    urls.cognito_app_redirect_path_token = `${AppConfig.frontend}/login/code`;
	urls.cognito_app_redirect_logout_path = `${AppConfig.frontend}/home`;
	
	// Cognito URLs
	urls.cognito_login_path = `/login?client_id=${AppConfig.cognito.cognito_app_client_id}&response_type=token&scope=email+openid+phone&redirect_uri=`;

	urls.cognito_login_path_code = `/login?client_id=${AppConfig.cognito.cognito_app_client_id}&response_type=code&scope=email+openid+phone&redirect_uri=`;
	
	urls.cognito_login_code_url = `${AppConfig.cognito.cognito_host}${urls.cognito_login_path_code}` 
		+ encodeURIComponent(AppConfig.cognito.urls.cognito_app_redirect_path_code);

	urls.cognito_logout_path = `/logout?client_id=${AppConfig.cognito.cognito_app_client_id}&response_type=token&redirect_uri=unused&logout_uri=`;
	urls.cognito_token_path = `/oauth2/token?client_id=${AppConfig.cognito.cognito_app_client_id}&grant_type=authorization_code&redirect_uri=`;   
	
	urls.cognito_token_url = `${AppConfig.cognito.cognito_host}${urls.cognito_token_path}` 
		+ encodeURIComponent(`${AppConfig.cognito.urls.cognito_app_redirect_path_token}`) + "&code=";

	urls.cognito_keys = `https://cognito-idp.${AppConfig.aws.options.region}.amazonaws.com/${AppConfig.cognito.cognito_pool_id}/.well-known/jwks.json`;
	
}

module.exports = deriveConfig;