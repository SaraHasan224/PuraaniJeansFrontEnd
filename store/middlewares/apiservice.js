// import axios from 'axios'
import {
	API_REQUEST,
	API_ENDPOINTS,
} from '../../utils'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiService = {
	getApplicationMetaData,
	getHomePage,
	getMegaMenu,
	getFeaturedItems,
	getCategoryItems,
	
	
	getCountryMetaData,
	getCountriesList,
}

async function getApplicationMetaData() {
	return API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.GET_APP_METADATA,
		false,
		false
	)()
}

async function getHomePage() {
	let response = await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.GET_HOMEPAGE_CONTENTS,
		false,
		false
	)()
	return response
}

async function getMegaMenu() {
	let response = await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.GET_MEGA_MENU_CONTENTS,
		false,
		false
	)()
	return response
}

async function getFeaturedItems() {
	return await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.GET_HOMEPAGE_FEATURED_SECTION,
		false,
		false
	)()
}

async function getCategoryItems(slug) {
	return await API_REQUEST(
		'get',
		`${baseURL}${API_ENDPOINTS.GET_CATEGORY}/${slug}/products`,
		false,
		false
	)()
}



async function getCountryMetaData() {
	return await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.COUNTRIES_METADATA,
		false,
		false
	)()
}

async function getCountriesList() {
	return response = await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.INITIATE_ORDER_ABANDONED,
		false,
		false
	)()
}

/*
async function deleteCustomerAccount(requestData) {
	const access_token = LOCAL_STORAGE_SERVICE._getAccessTokenFromSession()
	let axiosrequest = axios
		.delete(`${baseURL}` + API_ENDPOINTS.DELETE_SAVED_CARD, {
			headers: {
				'Content-Type': 'application/json',
				'Accept-Language': LOCAL_STORAGE_SERVICE._getFromLocalStorage('locale'),
				'Access-Control-Allow-Origin': '*',
				Authorization: 'Bearer ' + access_token,
			},
			data: requestData,
		})
		.then(
			(response) => {
				return Promise.resolve(response)
			},
			(error) => {
				// trigger 'loading=false' event here
				if (error?.response?.status === CONSTANTS.HTTP_RESPONSE.UNAUTHORIZED) {
					history.push('/401')
				} else {
					return Promise.reject(error)
				}
			}
		)
	// let response = await API_REQUEST(
	//   "delete",
	//   `${baseURL}` + API_ENDPOINTS.DELETE_ADDRESS,
	//   true,
	//   true
	// )(requestData);
	return axiosrequest
}
*/