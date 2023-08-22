import { ERROR_ACTION } from "../../store/actions"
import Resizer from "react-image-file-resizer";

function isEmpty(x) {
	return (
		typeof x === 'undefined' ||
		typeof x === undefined ||
		x === null ||
		x === 'null' ||
		x === 'undefined' ||
		x === false ||
		x.length === 0 ||
		x === ''
	)
}

function isNotEmpty(x) {
	return !isEmpty(x)
}

function firstLetterCapitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

//**blob to dataURL**
function blobToDataURL(blob, callback = '') {
	var a = new FileReader();
	if(callback) {
		a.onload = function (e) { callback(e.target.result); }
	}
	a.readAsDataURL(blob);
}

async function URltoBlobDataUrl(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}

function parseMetaData(data) {
	const countries = data?.countries
	var default_country = null
	var countryObject = []
	var countryData = {}
	var networks, networkObject, networkData
	var provinces, provinceObject, provinceData
	var cities, cityObject, cityData
	var areas, areaObject, areaData

	// Country
	countries &&
		countries.map((country) => {
			countryData = {}
			countryData.value = country?.country_id
			countryData.label = country?.name
			if (country?.is_default === 1) {
				default_country = {
					value: country?.country_id,
					label: country?.name,
					country_code: country?.country_code,
					code: country?.code,
				}
			}
			// Provinces
			provinces = country?.provinces
			provinceObject = []
			provinces &&
				provinces.map((province) => {
					provinceData = {}
					provinceData.value = province?.id
					provinceData.label = province?.name
					// Cities
					cities = province?.cities
					cityObject = []
					cities &&
						cities.map((city) => {
							cityData = {}
							cityData.value = city?.id
							cityData.label = city?.name
							//Area
							areas = city?.areas
							areaObject = []
							areas &&
								areas.map((area) => {
									areaData = {}
									areaData.value = area?.id
									areaData.label = area?.name
									areaObject.push(areaData)
									return null
								})
							cityData.areas = areaObject
							cityObject.push(cityData)
							return null
						})
					provinceData.cities = cityObject
					provinceObject.push(provinceData)
					return null
				})
			countryData.provinces = provinceObject
			//Telecom Networks
			networks = country?.teleco_networks
			networkObject = []
			networks &&
				networks.map((network) => {
					networkData = {}
					networkData.value = network?.id
					networkData.label = network?.name
					networkObject.push(networkData)
					return null
				})
			countryData.networks = networkObject
			//Save country data with province, city, area and telecom networks
			countryObject.push(countryData)
			return null
		})
	let responseObject = { default_country, countryObject }
	return responseObject
}

function parseDefaultMetaData(data, selected) {
	let cityId = selected?.city_id

	const countries = data?.countries
	var countryObject = []
	var countryData = {}
	var provinces, provinceObject, provinceData
	var cities, cityObject, cityData
	var areas, areaObject, areaData
	var defaultAreaObject = []

	// Country
	countries &&
		countries.map((country) => {
			countryData = {}
			countryData.value = country?.country_id
			countryData.label = country?.name
			// Provinces
			provinces = country?.provinces
			provinceObject = []
			provinces &&
				provinces.map((province) => {
					provinceData = {}
					provinceData.value = province?.id
					provinceData.label = province?.name
					// Cities
					cities = province?.cities
					cityObject = []
					cities &&
						cities.map((city) => {
							cityData = {}
							cityData.value = city?.id
							cityData.label = city?.name
							//Area
							areas = city?.areas
							areaObject = []
							areas &&
								areas.map((area) => {
									areaData = {}
									areaData.value = area?.id
									areaData.label = area?.name
									areaObject.push(areaData)
									if (city?.id === cityId) {
										defaultAreaObject.push(areaData)
									}
									return null
								})
							cityData.areas = areaObject
							cityObject.push(cityData)
							return null
						})
					provinceData.cities = cityObject
					provinceObject.push(provinceData)
					return null
				})
			countryData.provinces = provinceObject
			//Save country data with province, city, area and telecom networks
			countryObject.push(countryData)
			return null
		})
	const dropdown = {
		countryData: countryObject,
		provinceData: provinceObject,
		citiesData: cityObject,
		areasData: defaultAreaObject,
	}
	return dropdown
}

function findProvinceByCountryId(meta, countryId) {
	const countries = meta
	var provinces, provinceObject, provinceData
	var cities, cityObject, cityData
	var areas, areaObject, areaData
	// Country
	provinceObject = []
	countries &&
		countries.map((country) => {
			if (country?.value === countryId) {
				// Provinces
				provinces = country?.provinces
				provinces &&
					provinces.map((province) => {
						provinceData = {}
						provinceData.value = province?.value
						provinceData.label = province?.label
						// Cities
						cities = province?.cities
						cityObject = []
						cities &&
							cities.map((city) => {
								cityData = {}
								cityData.value = city?.value
								cityData.label = city?.label
								//Area
								areas = city?.areas
								areaObject = []
								areas &&
									areas.map((area) => {
										areaData = {}
										areaData.value = area?.value
										areaData.label = area?.label
										areaObject.push(areaData)
										return null
									})
								cityData.areas = areaObject
								cityObject.push(cityData)
								return null
							})
						provinceData.cities = cityObject
						provinceObject.push(provinceData)
						return null
					})
			}
			return null
		})
	return provinceObject
}

function findCityByProvinceId(provinces, provinceId) {
	var cities, cityObject, cityData
	var areas, areaObject, areaData
	// Provinces
	provinces &&
		provinces.map((province) => {
			if (province?.value === provinceId) {
				// Cities
				cities = province?.cities
				cityObject = []
				cities &&
					cities.map((city) => {
						cityData = {}
						cityData.value = city?.value
						cityData.label = city?.label
						//Area
						areas = city?.areas
						areaObject = []
						areas &&
							areas.map((area) => {
								areaData = {}
								areaData.value = area?.value
								areaData.label = area?.label
								areaObject.push(areaData)
								return null
							})
						cityData.areas = areaObject
						cityObject.push(cityData)
						return null
					})
				return null
			}
			return null
		})
	return cityObject
}

function findAreaByCityId(cities, cityId) {
	var areas, areaObject, areaData
	// Cities
	areaObject = []

	cities &&
		cities.map((city) => {
			if (parseInt(city?.value) === parseInt(cityId)) {
				//Area
				areas = city?.areas
				areaObject = []
				areas &&
					areas.map((area) => {
						areaData = {}
						areaData.value = area?.value
						areaData.label = area?.label
						areaObject.push(areaData)
						return null
					})
			}
			return null
		})
	return areaObject
}

function stringToBoolean(string) {
	switch (string) {
		case 'true':
		case 'yes':
		case '1':
		case 1:
			return true
		case 'false':
		case 'no':
		case '0':
		case 0:
		case null:
			return false
		default:
			return Boolean(string)
	}
}

const formatFailureApiResponse = (error) => {
	const error_response = error?.response
	const errorResponse = error_response?.data?.status
	const errorBody = error_response?.data?.body
	const error_message = ERROR_ACTION.ERROR(error_response);
	return { error_response, error_message, errorBody, errorResponse }
}

function getSelectedVariant(product) {
	let { default_variant_id, variants, selected_variant } = product;
	if (HELPER.isNotEmpty(selected_variant)) {
		return selected_variant;
	} else if (HELPER.isNotEmpty(variants)) {
		let selectedVariant = HELPER.isNotEmpty(variants?.variant_id)
			? variants
			: variants.find(variant => variant.variant_id === default_variant_id);
		if (HELPER.isNotEmpty(selectedVariant.attributes)) {
			selectedVariant.attributes = selectedVariant.attributes?.map(e =>
				Array.isArray(e?.options) ? { ...e, options: e?.options[0] } : e
			);
		} else {
			selectedVariant.attributes = product.attributes;
		}
		return selectedVariant;
	}
	return product;
}

// function toDataURL(src, callback) {
// 	var image = new Image();
// 	image.crossOrigin = 'Anonymous';
// 	image.onload = function () {
// 		var canvas = document.createElement('canvas');
// 		var context = canvas.getContext('2d');
// 		canvas.height = this.naturalHeight;
// 		canvas.width = this.naturalWidth;
// 		context.drawImage(this, 0, 0);
// 		var dataURL = canvas.toDataURL('image/jpeg');
// 		callback(dataURL);
// 	};
// 	image.src = src;
// }

function resizeFile(file, maxWidth, maxHeight, width, height = 0) {
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			maxWidth,
			maxHeight,
			"PNG",
			width,
			height,
			(uri) => {
				resolve(uri);
			},
			"base64"
		);
	});
}

function toDataURL(src, callback, outputFormat) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function () {
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var dataURL;
		canvas.height = this.naturalHeight;
		canvas.width = this.naturalWidth;
		ctx.drawImage(this, 0, 0);
		dataURL = canvas.toDataURL(outputFormat);
		callback(dataURL);
	};
	img.src = src;
	if (img.complete || img.complete === undefined) {
		img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		img.src = src;
	}
}

function formatProductDetailImage(images) {
	let _images = [];
	images.forEach((imagepath, key) => {
		_images[key] = {image: imagepath?.url}
	});
	return _images;
}

const HELPER = {
	stringToBoolean,
	firstLetterCapitalize,
	isEmpty,
	isNotEmpty,
	parseMetaData,
	parseDefaultMetaData,
	findProvinceByCountryId,
	findCityByProvinceId,
	findAreaByCityId,
	formatFailureApiResponse,
	getSelectedVariant,
	blobToDataURL,
	toDataURL,
	resizeFile,
	formatProductDetailImage
}
export default HELPER
