const SimpleDataModel = require('../models/simple-data-model.js')
const FakeSimpleDataModel = require('./fake-simple-data-model.js')
const constants = require('../constants.js')
const fs = require('fs')
const CourseData = require('../models/course-data.js')
const ReviewData = require('../models/review-data.js')
const appRoot = require('app-root-path')
const util = require('../util.js')

let model = new FakeSimpleDataModel(constants.LOCAL_DATA_FILE)

function getFakeReview(courseData) {
    let reviewData = Object.assign(new ReviewData(), {
        courseID: courseData.courseID,
        body: `${courseData.code} is so ${Math.random() > 0.5 ? "fun" : "boring"}!`,
        difficultyRating: util.randint(1, 6),
        qualityRating: util.randint(1, 6),
    })

    return reviewData
}

for (var courseID in model.courses) {
    let courseData = model.courses[courseID]
    for (var i = 0; i < 5; ++i) {
        let reviewData = getFakeReview(courseData)
        model.addReview(reviewData)
            .then((result) => {
                if (!result) {
                    console.log("failed to add review for course " + reviewData.courseID);
                }
            })
    }
}

console.log('saving data ...')
model.saveData(true).then(() => {
    console.log('done.')
    process.exit(0)
})
