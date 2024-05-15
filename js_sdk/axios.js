import axios from "axios"

// 创建axios实例
const service = axios.create({
	timeout: 6000,
});

//发送GET请求
/**
 * @param {string} url
 */
async function get(url) {
	try {
		return await service.get(url)
	} catch (error) {
		if (error.response) {
			console.log(error.response.data.msg)
		}
	}
}

//发送POST请求
/**
 * @param {string} url
 * @param {any} data
 */
async function post(url, data) {
	try {
		return await service.post(url, data)
	} catch (error) {
		if (error.response) {
			console.log(error.response.data.msg)
		} else {
			console.log(error.message)
		}
	}
}


function post2(url,data){
	try {
		return service.post(url, data)
	} catch (error) {
		throw error
	}
}

export default{
	get,
	post,
	post2
}