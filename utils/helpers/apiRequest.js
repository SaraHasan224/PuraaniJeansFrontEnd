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
		(method, url, token, ...params) => {
			console.log("method, url, token: ", method, url, token)
			let access_token = '';
				// Perform localStorage action
				access_token = LOCAL_STORAGE_SERVICE._getFromLocalStorage("access_token")
			if (access_token) {
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
				mainInstance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
			}
			console.log("access_token: ", access_token)

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
