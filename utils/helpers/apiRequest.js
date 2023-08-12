import axios from 'axios'
import {
	LOCAL_STORAGE_SERVICE, 
	HELPER,
	COOKIE_STORAGE_SERVICE
} from '../../utils'

var mainInstance = axios.create({
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
})

const makeRequest =
	(instance) =>
		(method, url, token, ...params) => {
			let access_token = '';
				// Perform localStorage action
				access_token = COOKIE_STORAGE_SERVICE._getAccessToken()
			if (access_token) {
				axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
				mainInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
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
	(method, url, token) =>
		(...params) => {
			return makeRequest(mainInstance)(
				method,
				url,
				token,
				...params
			)
		}
export default API_REQUEST
