const uniqid = require('uniqid')
const fs = require('fs')
const util = require('../util.js')
const constants = require('../constants.js')
const DataModel = require('./data-model.js')

// query limit are applied at other places

function getUniqueID() {
    return uniqid()
}

class SimpleDataModel extends DataModel {
    constructor(fileName) {
        super()

        /** map from courseID to CourseData */
        this.courses = {}

        /** map from courseID to ReviewData[] */
        this.courseReviews = {}

        /** map from reviewID to ReviewData */
        this.reviews = {}

        /** map from userID to UserData */
        this.users = {}

        /** local file name */
        this.fileName = fileName

        this.loadData()
        setInterval(() => {
            this.saveData(true)
        }, 5000)
    }

    serialize() {
        return JSON.stringify({
            courses: this.courses,
            courseReviews: this.courseReviews,
            users: this.users
        })
    }

    deserialize(content) {
        if (content && content.length > 0) {
            let data = JSON.parse(content)
            this.courses = data.courses
            this.courseReviews = data.courseReviews
            this.users = data.users

            // rebuild this.reviews
            this.reviews = {}
            for (var courseID in this.courseReviews) {
                let reviews = this.courseReviews[courseID]
                for (var i = 0; i < reviews.length; ++i) {
                    let review = reviews[i]
                    this.reviews[review.reviewID] = review
                }
            }
        }
    }

    loadData() {
        if (!fs.existsSync(this.fileName)){
            return
        }

        let content = fs.readFileSync(this.fileName)
        this.deserialize(content)
    }

    saveData(sync) {
        sync = sync || false
        let content = this.serialize()
        return new Promise((resolve, reject) => {
            if (sync) {
                fs.writeFileSync(constants.TEMP_FILE, content)
                fs.renameSync(constants.TEMP_FILE, this.fileName)
                resolve()
            }
            else {
                fs.writeFile(constants.TEMP_FILE, content, (err) => {
                    if(err) {
                        reject(err)
                        return
                    }
                    fs.rename(constants.TEMP_FILE, this.fileName, (err) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        resolve()
                    })
                })
            }
        })
    }

    getCourses(query, start, count) {
        start = parseInt(start)
        count = parseInt(count)

        let result = []

        query = query || ''
        for (var courseID in this.courses) {
            let courseData = this.courses[courseID]
            if (util.startswith(
                courseData.code.toLowerCase(), query.toLowerCase()
            )) {
                result.push(courseData)
            }
        }

        return Promise.resolve({
            count: result.length,
            data: result.slice(start, start + count)
        })
    } 

    getCourseData(courseID) {
        return Promise.resolve(this.courses[courseID])
    }

    getUserData(userID) {
        return Promise.resolve(this.users[userID])
    }

    getReviews(courseID, start, count) {
        start = parseInt(start)
        count = parseInt(count)

        let reviews = this.courseReviews[courseID]
        if (reviews) {
            return Promise.resolve({
                count: reviews.length,
                data: reviews.slice(start, start + count).reverse()
            })
        }
        return Promise.resolve(null)
    }

    addReview(reviewData) {
        if (!reviewData.courseID || !this.courseReviews[reviewData.courseID]) {
            return Promise.resolve(false)
        }

        reviewData.reviewID = getUniqueID()
        reviewData.time = Date.now()

        this.courseReviews[reviewData.courseID].push(reviewData)
        this.reviews[reviewData.reviewID] = reviewData

        this._updateCourseRating(reviewData.courseID)

        return Promise.resolve(true)
    }

    addCourse(courseData) {
        if (!courseData.courseID || this.courses[courseData.courseID]) {
            return Promise.resolve(false)
        }

        this.courses[courseData.courseID] = courseData
        this.courseReviews[courseData.courseID] = []
        return Promise.resolve(true)
    }

    addUser(userData) {
        if(!userData.userID || this.users[userData.userID]){
            return Promise.resolve(false)
        }

        this.users[userData.userID] = userData
        return Promise.resolve(true)
    }

    deleteReview(reviewID) {
        let reviewData = this.reviews[reviewID]

        if (reviewData) {
            let reviews = this.courseReviews[reviewData.courseID]
            let index = reviews.indexOf(reviewData)
            if (index == -1) {
                return Promise.resolve(false)
            }
            reviews.splice(index, 1)
            delete this.reviews[reviewID]
            return Promise.resolve(true)
        }

        return Promise.resolve(false)
    }

    _updateCourseRating(courseID) {
        let reviews = this.courseReviews[courseID]
        if (!reviews || reviews.length <= 0) {
            return
        }

        let difficultyRating = 0
        let qualityRating = 0
        for (var i = 0; i < reviews.length; ++i) {
            let reviewData = reviews[i]
            difficultyRating += reviewData.difficultyRating
            qualityRating += reviewData.qualityRating
        }

        let courseData = this.courses[courseID]
        courseData.difficultyRating = difficultyRating / reviews.length
        courseData.qualityRating = qualityRating / reviews.length
    }
}

module.exports = SimpleDataModel
