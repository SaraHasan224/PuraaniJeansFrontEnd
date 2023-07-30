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
	
	createYourCloset,
	uploadYourClosetImage,
	getClosetDetail,
	getClosetProductList,
	
	getProductDetail,
	getRecentlyViewed,
	
	getCountryMetaData,
	getCountriesList,
	
	getSignupEvent,
	getSignInEvent,
	getPhoneVerification,
	getPhoneOtpVerify,
	getPhoneOtpReSend
}

async function getApplicationMetaData() {
	return API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.GET_APP_METADATA,
		false,
	)()
}

async function getHomePage() {
	let response = await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.GET_HOMEPAGE_CONTENTS,
		false,
	)()
	return response
}

async function getMegaMenu() {
	let response = await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.GET_MEGA_MENU_CONTENTS,
		false,
	)()
	return response
}

async function getFeaturedItems() {
	return await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.GET_HOMEPAGE_FEATURED_SECTION,
		false,
	)()
}

async function getCategoryItems(slug) {
	return await API_REQUEST(
		'get',
		`${baseURL}${API_ENDPOINTS.GET_CATEGORY}/${slug}/products`,
		false,
	)()
}

async function getProductDetail(handle) {
	return await API_REQUEST(
		'post',
		`${baseURL}${API_ENDPOINTS.GET_PRODUCT_DETAIL}/${handle}`,
		true,
	)()
}

async function getRecentlyViewed() {
	return await API_REQUEST(
		'post',
		`${baseURL}${API_ENDPOINTS.GET_RECENTLY_VIEWED_PRODUCTS}`,
		true,
	)()
}


async function createYourCloset(data) {
	return await API_REQUEST(
		'post',
		`${baseURL}${API_ENDPOINTS.CREATE_CLOSET}`,
		true,
	)(data)
}

async function uploadYourClosetImage(requestData) {
  let response = await axiosRequest(
    "post",
    `${baseURL}` + API_ENDPOINTS.CLOSET_IMG_UPLOAD,
    true
  )(requestData);
  return response;
}

async function getClosetDetail(handle) {
	return await API_REQUEST(
		'get',
		`${baseURL}${API_ENDPOINTS.GET_CLOSET_DETAIL}/${handle}`,
		true,
	)()
}

async function getClosetProductList(handle, pageNumber) {
	return await API_REQUEST(
		'get',
		`${baseURL}${API_ENDPOINTS.GET_CLOSET_DETAIL}/${handle}?page=${pageNumber}`,
		true,
	)()
}

async function getSignupEvent(data) {
	return await API_REQUEST(
		'post',
		`${baseURL}` + API_ENDPOINTS.AUTH_SIGNUP,
		false,
	)(data)
}

async function getSignInEvent(data) {
	return await API_REQUEST(
		'post',
		`${baseURL}` + API_ENDPOINTS.AUTH_SIGNIN,
		false,
	)(data)
}

async function getPhoneVerification(data) {
	return await API_REQUEST(
		'post',
		`${baseURL}` + API_ENDPOINTS.AUTH_OTP_SEND,
		true,
	)(data)
}


async function getPhoneOtpReSend(data) {
	return await API_REQUEST(
		'post',
		`${baseURL}` + API_ENDPOINTS.AUTH_OTP_RESEND,
		true,
	)(data)
}


async function getPhoneOtpVerify(data) {
	return await API_REQUEST(
		'post',
		`${baseURL}` + API_ENDPOINTS.AUTH_OTP_VERIFY,
		true,
	)(data)
}

async function getCountryMetaData() {
	return await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.COUNTRIES_METADATA,
		false,
	)()
}

async function getCountriesList() {
	return await API_REQUEST(
		'get',
		`${baseURL}` + API_ENDPOINTS.COUNTRIES_LIST,
		false,
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