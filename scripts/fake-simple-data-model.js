const SimpleDataModel = require('../models/simple-data-model.js')

class FakeSimpleDataModel extends SimpleDataModel {

    serialize() {
        let courseList = []
        for(var courseID in this.courses) {
            let course = this.courses[courseID]
            courseList.push(course)
        }

        let reviewList = []
        for (var reviewID in this.reviews) {
	        let review = this.reviews[reviewID]
            reviewList.push(review)
        }
        // for (var courseID in this.courseReviews) {
        //     let reviews = this.courseReviews[courseID]
        //     let obj = {
        //         "_id": courseID,
        //     }
        //     obj[courseID] = reviews
        //     reviewList.push(obj)
        // }

        return JSON.stringify({
            courses: courseList,
            reviewList: reviewList,
            users: this.users
        })
    }
    
}

module.exports = FakeSimpleDataModel
