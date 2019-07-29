const SimpleDataModel = require('../models/simple-data-model.js')
const constants = require('../constants.js')
const fs = require('fs')
const CourseData = require('../models/course-data.js')
const ReviewData = require('../models/review-data.js')
const appRoot = require('app-root-path')

let model = new SimpleDataModel(constants.LOCAL_DATA_FILE)

let cobaltData = JSON.parse(fs.readFileSync(constants.COBALT_DATA_FILE))
for (var i = 0; i < cobaltData.length; i++) {
	let data = cobaltData[i]
	let courseData = Object.assign(new CourseData(), data)
    model.addCourse(courseData)
        .then((result) => {
            if (result) {
                console.log('added course ' + data.courseID)
            }
            else {
                console.log('failed to add course ' + data.courseID)
            }
        })
}

console.log('saving data ...')
model.saveData(true).then(() => {
	console.log('done.')
	process.exit(0)
})
