import { ERROR_ACTION } from "../../store/actions"

function isEmpty(x) {
	return (
		typeof x === 'undefined' ||
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
	const errorBody = error_response?.data?.body
	const error_message = ERROR_ACTION.ERROR(error_response);
	return { error_response, error_message, errorBody }
}

const HELPER = {
	stringToBoolean,
	isEmpty,
	isNotEmpty,
	parseMetaData,
	parseDefaultMetaData,
	findProvinceByCountryId,
	findCityByProvinceId,
	findAreaByCityId,
	formatFailureApiResponse
}
export default HELPER
