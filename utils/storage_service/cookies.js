import { HELPER, LOCAL_STORAGE_SERVICE } from '../../utils'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
// Set expiry time
var days = parseInt(process.env.NEXT_PUBLIC_COOKIE_EXPIRY)
var expiry = new Date()
expiry.setDate(expiry.getDate() + days)
let cookieSettings
if (process.env.REACT_APP_COOKIES_ENABLED == 0) {
	cookieSettings = {
		path: '/',
		expires: expiry,
		domain: 'localhost',
		sameSite: 'lax',
	}
} else {
	cookieSettings = {
		path: '/',
		expires: expiry,
		secure: true,
		domain: process.env.REACT_APP_SUB_DOMAIN_URL,
		sameSite: 'lax',
	}
}

/**
 *
 * COOKIE STORAGE SERVICE
 */

function _getAccessToken() {
	return cookies.get('access_token')
}
function _getAccessTokenFromSession() {
	const localStorageAT = LOCAL_STORAGE_SERVICE._getFromLocalStorage('access_token')
	const cookiesAT = cookies.get('access_token')
	return HELPER.isNotEmpty(localStorageAT) ? localStorageAT : cookiesAT
}
function _updateAccessToken(access_token) {
	LOCAL_STORAGE_SERVICE._saveToLocalStorage("access_token", access_token)
	cookies.set('access_token', access_token, cookieSettings)
}
function _removeAccessToken() {
	LOCAL_STORAGE_SERVICE._deleteFromLocalStorage('access_token')
	if (cookies.get('access_token') !== undefined) {
		return cookies.remove('access_token', cookieSettings)
	}
}

export const COOKIE_STORAGE_SERVICE = {
	_getAccessToken,
	_getAccessTokenFromSession,
	_updateAccessToken,
	_removeAccessToken,
}
