import axios from 'axios'
import {
	LOCAL_STORAGE_SERVICE, 
	HELPER
} from '../../utils'

var mainInstance = axios.create({
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})

const makeRequest =
	(instance) =>
		(method, url, token, allow_error_pages, allow_byPass_Expiry, ...params) => {
			if (allow_byPass_Expiry) {
				mainInstance.defaults.headers.common['x-bypass-expiry'] = 'enabled'
			} else {
				delete mainInstance.defaults.headers.common['x-bypass-expiry']
			}

			let locale = '';
			if (typeof window !== 'undefined') {
				// Perform localStorage action
				locale = LOCAL_STORAGE_SERVICE._getFromLocalStorage('locale')
			}
			// Set Language Headers
			mainInstance.defaults.headers.common['Accept-Language'] = HELPER.isNotEmpty(locale)
				? locale
				: 'en'
			// Set Access token
			let access_token = '';
			// if (typeof window !== 'undefined') {
			// 	// Perform localStorage action
			// 	access_token = LOCAL_STORAGE_SERVICE._getAccessTokenFromSession()
			// }
			if (access_token) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
				mainInstance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
			}

			if (!token) {
				delete axios.defaults.headers.common['Authorization']
				delete mainInstance.defaults.headers.common['Authorization']
			}
			// Add a response interceptor
			instance.interceptors.response.use(
				(response) => {
					return Promise.resolve(response)
				},
				(error) => {
					return Promise.reject(error)
				}
			)
			return instance[method](url, ...params)
		}

const API_REQUEST =
	(method, url, token, allow_error_pages, allow_byPass_Expiry = false) =>
		(...params) => {
			return makeRequest(mainInstance)(
				method,
				url,
				token,
				allow_error_pages,
				allow_byPass_Expiry,
				...params
			)
		}
export default API_REQUEST
