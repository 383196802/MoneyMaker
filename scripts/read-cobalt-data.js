const request = require('request')
const fs = require('fs')
const constants = require('../constants.js')

function getCourseCode(courseData) {
	return courseData.code.substring(0, 7)
}

function getCourseID(courseData) {
	return courseData.campus + '-' + getCourseCode(courseData)
}

function processData(courseData) {
	return {
		courseID: getCourseID(courseData),
		code: getCourseCode(courseData),
		name: courseData.name,
		description: courseData.description,
		campus: courseData.campus,
	}
}

function getData(limit, callback, result, skip) {
	result = result || []
	skip = skip || 0
	
	let url = {
		url: constants.COBALT_COURSES_URL,
		qs: {
			key: constants.COBALT_API_KEY,
			q: 'code:"CSC"',
			skip: skip,
			limit: limit,
		}
	}
	console.log('sending request for skip = ' + skip + ', limit = ' + limit)
	request.get(url, (err, response, body) => {
		if (err) {
			console.log(err)
		}
		else {
			let data = JSON.parse(body)
			if (!data || data.length == 0) {
				callback(result)
			}
			else {
				for (var i = 0; i < data.length; ++i) {
					result.push(processData(data[i]))
				}
				getData(limit, callback, result, skip + limit)
			}
		}
	})
}

let savePath = constants.COBALT_DATA_FILE
function saveData(data) {
	console.log('saving data to ' + savePath)
	fs.writeFileSync(savePath, JSON.stringify(data))
	console.log('done.')
}

let limit = 100
getData(limit, saveData)
// stringify the array
// write to file


