const ALERT_CONSTANTS = {
	SUCCESS: 'ALERT_SUCCESS',
	ERROR: 'ALERT_ERROR',
	SECONDARY: 'ALERT_SECONDARY',
	CLEAR: 'ALERT_CLEAR',
	WARNING: 'ALERT_WARNING',
}
const META_CONSTANTS = {
	COUNTRY_META: {
		REQUEST: 'COUNTRY_META_REQUEST',
		SUCCESS: 'COUNTRY_META_SUCCESS',
		FAILURE: 'COUNTRY_META_FAILURE',
	},
	COUNTRY_LIST: {
		REQUEST: 'COUNTRY_LIST_REQUEST',
		SUCCESS: 'COUNTRY_LIST_SUCCESS',
		FAILURE: 'COUNTRY_LIST_FAILURE',
	},
}

const HOME_CONSTANTS = {
	HOMEPAGE_META: {
		REQUEST: 'HOMEPAGE_METADATA_REQUEST',
		SUCCESS: 'HOMEPAGE_METADATA_SUCCESS',
		FAILURE: 'HOMEPAGE_METADATA_FAILURE',
	},
	HOMEPAGE: {
		REQUEST: 'HOMEPAGE_REQUEST',
		SUCCESS: 'HOMEPAGE_SUCCESS',
		FAILURE: 'HOMEPAGE_FAILURE',
	},
	FEATURED_ITEMS: {
		REQUEST: 'RECOMMENDED_ITEMS_LIST_REQUEST',
		SUCCESS: 'RECOMMENDED_ITEMS_LIST_SUCCESS',
		FAILURE: 'RECOMMENDED_ITEMS_LIST_FAILURE',
	},
}

const ERROR_CONSTANTS = {
	MESSAGE: 'ERROR_MESSAGE',
}

export {
	ALERT_CONSTANTS,
	ERROR_CONSTANTS,
	HOME_CONSTANTS,
    META_CONSTANTS,
}