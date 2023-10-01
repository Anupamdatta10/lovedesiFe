import Config from './Config'
import * as Store from '../index'
import LoginActionTypes from '../Login/Utility/LoginActionTypes';
import AllActionTypes from './AllActionTypes'
import axios from 'axios';
import LoginUtility from '../Login/Utility/LoginUtility'
import Utility from './Utility'
import { createHashHistory } from 'history';
import moment from 'moment';

export const get = (url, data, header = "global") => {
	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		var params = data ? data.filters : {};
		let invokeError = true;
		if (typeof params == "string") {
			params = JSON.parse(params)
			if (params.size_width && params.size_height) invokeError = false;
		}
		axios.get(apiBaseUrl, {
			params: data,
			headers: getHeaders(header, url)
		}).then((response) => {
			//console.log("response====>111111111111111111111111",response)
			resolve(response);
		}).catch((error) => {
			//console.log("error====>111111111111111111111111",error.response)
			reject(error);
			if (invokeError) {
				errorHandlingBlock(error)
			}
		})
	});
}
export const post = (url, data, header = "global") => {
	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.post(apiBaseUrl, data, { headers: getHeaders(header, url) }).then((response) => {
			resolve(response);
		}).catch((error) => {
			reject(error);
			errorHandlingBlock(error)
		})
	});
}
export const patch = (url, data, header = "global") => {
	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.patch(apiBaseUrl, data, { headers: getHeaders(header, url) }).then((response) => {
			resolve(response);
		}).catch((error) => {
			reject(error);
			errorHandlingBlock(error)
		})
	});
}
export const put = (url, data, header = "global") => {
	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.put(apiBaseUrl, data, { headers: getHeaders(header, url) }).then((response) => {
			resolve(response);
		}).catch((error) => {
			reject(error);
			errorHandlingBlock(error)
		})
	});
}
export const del = (url, data, header = "global") => {

	//console.log("header===============del",header)

	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.delete(apiBaseUrl, {
			data: data,
			headers: getHeaders(header, url)
		}).then((response) => {
			resolve(response);
		}).catch((error) => {
			reject(error);
			errorHandlingBlock(error)
		})
	});
}

export const download = (url, data, header = "global") => {
	return new Promise((resolve, reject) => {
		let apiBaseUrl = `${Config.baseURL}${url}`;
		axios.get(apiBaseUrl, {
			params: data,
			headers: getHeaders(header, url),
			responseType: 'arraybuffer'
		}).then((response) => {
			resolve(response);
		}).catch((error) => {
			reject(error);
			errorHandlingBlock(error)
		})
	});
}



export const getHeaders = (header, path = "") => {
	//console.log("localStorage.setItem('i18nextLng'",localStorage.getItem('i18nextLng'))
	checkExpiryOfToken()
	let headers = {};
	headers['language'] = localStorage.getItem('i18nextLng');
	if (header == null) {
		headers['language'] = localStorage.getItem('i18nextLng');
	} else if (header == "global") {
		//console.log("Store.default.getState().LoginReducer.token===>", Store.default.getState().LoginReducer.token)
		headers["Authorization"] = Store.default.getState().LoginReducer.token;
		//headers["Access-Control-Allow-Origin"] = "*"
	} else if (Object.keys(header).length > 0) {
		if (path == `${Config.extendedUrl}users/userforcepasswordchange`) {
			Object.keys(header).map((key, idx) => {
				headers[key] = header[key];
			})
		} else if (path == `${Config.extendedUrl}users/signout`) {
			localStorage.setItem('i18nextLng', 'en');
			headers["Authorization"] = Store.default.getState().LoginReducer.token;
			headers["Accesstoken"] = Store.default.getState().LoginReducer.accessToken;
		} else if (path == `${Config.extendedUrl}users/changepassword`) {
			headers["Authorization"] = Store.default.getState().LoginReducer.token;
			headers["Accesstoken"] = Store.default.getState().LoginReducer.accessToken;
		}
	}
	return headers
};

export const checkExpiryOfToken = () => {
	let currentDateTime = new Date();
	//console.log("currentDateTimecurrentDateTime==>", currentDateTime)
	//console.log("expiryTimeexpiryTimeexpiryTime==>", Store.default.getState().LoginReducer)

	// Store.default.getState().LoginReducer.expiresIn.expiryInterval = 10
	// Store.default.getState().LoginReducer.expiresIn.expiryTime = moment(Store.default.getState().LoginReducer.expiresIn.loggedInTime).add(10, 'seconds').format('YYYY-MM-DDTHH:mm:ssZ')

	const expiryTime = new Date(Store.default.getState().LoginReducer.expiresIn.expiryTime)
	const loggedInTime = new Date(Store.default.getState().LoginReducer.expiresIn.loggedInTime)
	const expiryInterval = Store.default.getState().LoginReducer.expiresIn.expiryInterval

	/*console.log("currentDateTime===>", currentDateTime)
	console.log("expiryTime===========>", expiryTime)
	console.log("loggedInTime===========>", loggedInTime)
	console.log("expiryInterval===========>", expiryInterval)*/
	if (expiryTime != "") {
		//console.log("Store.default.getState().LoginReducer==>", Store.default.getState().LoginReducer)
		//let deltaDifference = ((expiryTime == "" ? 0 : expiryTime) - (loggedInTime == "" ? 0 : loggedInTime)) / 1000
		let deltaDifference = ((currentDateTime == "" ? 0 : currentDateTime) - (loggedInTime == "" ? 0 : loggedInTime)) / 1000
		//console.log("deltaDifference===>", deltaDifference)
		if (currentDateTime >= expiryTime && (deltaDifference <= expiryInterval)) {
			refershToken()
		}
	}

};
export const refershToken = () => {
	//console.log("Call refershToken===============>>>")
	const history = createHashHistory();
	let res = new Promise((resolve, reject) => {
		let header = {};
		header["Authorization"] = Store.default.getState().LoginReducer.token;
		let apiBaseUrl = `${Config.baseURL}${Config.extendedUrl}auth/users/refreshtoken`;
		let data = {}
		data["refreshToken"] = Store.default.getState().LoginReducer.refreshToken;
		//console.log("refreshToken=========data",refreshToken)
		axios.patch(apiBaseUrl, data, { headers: header }).then((response) => {
			resolve(response);
		}).catch((error) => {
			//console.log("error=============", error)
			logoutApp()
			//reject(error);
		})
	});
	res.then((result) => {
		//console.log("result===>", result.data)
		let finalResponse = result.data
		if (finalResponse.success) {
			const finalIdToken = finalResponse.data.tokenType + ' ' + finalResponse.data.idToken;
			const accessToken = finalResponse.data.accessToken
			const expiresIn = LoginUtility.getExpiryDetails(finalResponse.data.expiresIn)
			Store.default.dispatch({
				type: LoginActionTypes.SET_TOKEN,
				payload: finalIdToken
			});
			Store.default.dispatch({
				type: LoginActionTypes.SET_ACCESS_TOKEN,
				payload: accessToken
			});
			Store.default.dispatch({
				type: LoginActionTypes.SET_TOKEN_EXPIRE_TIME,
				payload: expiresIn
			});
		} else {
			//Utility.toastNotifications(finalResponse.message, "Error", "error")
			//Utility.toastNotifications("Session Expired", "Error", "error")
			Utility.toastNotifications("Oops session has been expired!!!", "Error", "error")
			logoutApp()
		}
	})

};
export const logoutApp = () => {
	//console.log("logout")
	localStorage.setItem('i18nextLng', 'en');
	const history = createHashHistory();
	let logoutRes = new Promise((resolve, reject) => {
		let header = {};
		header["Authorization"] = Store.default.getState().LoginReducer.token;
		header["Accesstoken"] = Store.default.getState().LoginReducer.accessToken;
		let apiBaseUrl = `${Config.baseURL}${Config.extendedUrl}users/signout`;
		axios.delete(apiBaseUrl, {
			data: {},
			headers: header
		}).then((response) => {
			resolve(response);
		}).catch((error) => {
			//errorHandlingBlock(error)
			reject(error);
		})
	});
	Store.default.dispatch({
		type: LoginActionTypes.LOGOUT,
		payload: { "token": "", "accessToken": "", "refreshToken": "", "expiresIn": { "loggedInTime": "", "expiryTime": "", "expiryInterval": "" }, "userCredentials": {}, version: [], "roleWisePermission": {} }
	});
	Store.default.dispatch({
		type: AllActionTypes.CLEAR_DATA,
		payload: { "loaderState": false, "leftbar": false, "activeLink": { 'accName': "", 'activeClass': "" }, "roleWisePermission": {} }
	});

	history.push("/")
}
export const errorHandlingBlock = (error) => {
	/*console.log("error", error)
	console.log(error.message);
	console.log(error.status);*/

	if (error.response) {
		/*Store.default.dispatch({
		  type: AllActionTypes.LOADER_STATE_FALSE,
		  payload: false
		})*/
		// Request made and server responded
		/*console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.message);
		console.log(error.response.data.message);*/
		//console.log(error.response.headers);

		if (error.response.status == 409) {
			if (Array.isArray(error.response.data)) {
				//error.response.data.map((value)=>{
				Utility.toastNotifications(error.response.data[0].message, "Error", "error");
				//})
			} else {
				Utility.toastNotifications(error.response.data.message, "Error", "error")
			}
		}
		if (error.response.status == 406) {
			if (Array.isArray(error.response.data)) {
				//error.response.data.map((value)=>{
				Utility.toastNotifications(error.response.data[0].message, "Error", "error");
				//})
			} else {
				Utility.toastNotifications(error.response.data.message, "Error", "error")
			}
		}
		if (error.response.status == 400) {
			if (Array.isArray(error.response.data)) {
				//error.response.data.map((value)=>{
				Utility.toastNotifications(error.response.data[0].message, "Error", "error");
				//})
			} else {
				Utility.toastNotifications(error.response.data.message, "Error", "error")
			}
		}

		if (error.response.status == 404) {
			if (Array.isArray(error.response.data)) {
				//error.response.data.map((value)=>{
				Utility.toastNotifications(error.response.data[0].message, "Error", "error");
				//})
			} else {
				Utility.toastNotifications(error.response.data.message, "Error", "error")
			}
		}
		if (error.response.status == 401) {
			//Utility.toastNotifications(error.response.data.message, "Error", "error")
			//{"message":"The incoming token has expired"}
			if (error.response.data.message == "The incoming token has expired") {
				//Utility.toastNotifications("Session Expired", "Error", "error")
				Utility.toastNotifications("Oops session has been expired!!!", "Error", "error")
			}
			logoutApp()
		} else if (error.response.data) {
			Utility.toastNotifications(error.response.data.message, "Error", "error")
		}
	} else {
		Utility.toastNotifications(error.message, "Error", "error")
	}
}
export const setToken = (value) => {
	Store.default.dispatch({
		type: LoginActionTypes.SET_TOKEN,
		payload: value
	})
};
