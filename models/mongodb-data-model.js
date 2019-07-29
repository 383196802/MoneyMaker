const uniqid = require('uniqid')
const fs = require('fs')
const util = require('../util.js')
const constants = require('../constants.js')
const DataModel = require('./data-model.js')
const MongoClient = require('mongodb').MongoClient

// query limit are applied at other places

function getUniqueID() {
    return uniqid()
}

class MongoDBDataModel extends DataModel {

    constructor() {
        super()
    }

    _withMongoDB() {
        return MongoClient.connect(
            constants.DB_URL,
            {
                useNewUrlParser: true
            },
        ).then((database) => {
            return new Promise((resolve, reject) => {
                resolve(database)
            })
        })
    }

    getCourses(query, start, count) {
        let database = null
        return this._withMongoDB()
            .then((database_) => {
                database = database_
                let db = database.db("csc301")
                return db.collection("courses").count({
                    "courseID": {
                        $regex: query,
                        '$options' : 'i'
                    }
                })
            })
            .then((total) => {
                let db = database.db("csc301")
                return db.collection("courses").find({
                    "courseID": {
                        $regex: query,
                        '$options' : 'i'
                    }
                })
                    .skip(start)
                    .limit(count)
                    .toArray()
                    .then((result) => {
                        database.close()
                        return {
                            count: total,
                            data: result
                        }
                    })
            })
    }

    getCourseData(courseID) {
        return this._withMongoDB()
            .then((database) => {
                let db = database.db("csc301")
                return db.collection("courses").find({
                    "courseID": courseID
                })
                    .toArray()
                    .then((result) => {
                        database.close()
                        return result[0]
                    })
            })
    }

    getUserData(userID) {
        return this._withMongoDB()
            .then((database) => {
                let db = database.db("csc301")
                return db.collection("users").find({
                    "userID": userID
                })
                    .toArray()
                    .then((result) => {
                        database.close()
                        return result[0]
                    })
            })

    }

    getReviews(courseID, start, count) {
        let database = null
        return this._withMongoDB()
            .then((database_) => {
                database = database_
                let db = database.db("csc301")
                return db.collection("reviews").count({
                    "courseID": courseID
                })
            })
            .then((total) => {
                let db = database.db("csc301")
                return db.collection("reviews").find({
                    "courseID": courseID
                })
                    .sort({
                        "time": -1
                    })
                    .skip(start)
                    .limit(count)
                    .toArray()
                    .then((result) => {
                        database.close()
                        return {
                            count: total,
                            data: result
                        }
                    })
            })
    }

    addReview(reviewData) {
        console.log(reviewData);
        reviewData.reviewID = getUniqueID()
        reviewData.time = Date.now()

        return this._withMongoDB()
            .then((database) => {
                let db = database.db("csc301")
                db.collection("reviews").insertOne(reviewData)
                return this._updateCourseRating(reviewData.courseID)
            })
    }

    addCourse(courseData) {
        // not implemented
    }

    addUser(userData) {
        return this._withMongoDB()
            .then((database) => {
                let db = database.db("csc301")
                return db.collection("users").update(
                    {
                        userID: userData.userID,
                    },
                    userData,
                    {
                        upsert: true,
                    }
                )
            })
    }

    deleteReview(reviewID) {
        // not implemented
    }

    _updateCourseRating(courseID) {
        return this._withMongoDB()
            .then((database) => {
                let db = database.db("csc301")
                return db.collection("reviews").aggregate([
                    {
                        $match: {
                            "courseID": courseID
                        }},
                    {
                        $group: {
                            "_id": null,
                            qualityRating: {$avg: "$qualityRating"},
                            difficultyRating: {$avg: "$difficultyRating"},
                        }
                    }
                ])
                    .toArray()
                    .then((result) => {
                        return result[0]
                    })
            })
            .then((averageObject) => {
                return this._withMongoDB()
                    .then((database) => {
                        let db = database.db("csc301")
                        return db.collection("courses").updateOne(
                            {
                                "courseID": courseID,
                            },
                            {
                                $set: {
                                    "qualityRating": averageObject.qualityRating,
                                    "difficultyRating": averageObject.difficultyRating
                                }
                            }
                        )
                    })
            })

        // let reviews = this.courseReviews[courseID]
        // if (!reviews || reviews.length <= 0) {
        //     return
        // }

        // let difficultyRating = 0
        // let qualityRating = 0
        // for (var i = 0; i < reviews.length; ++i) {
        //     let reviewData = reviews[i]
        //     difficultyRating += reviewData.difficultyRating
        //     qualityRating += reviewData.qualityRating
        // }

        // let courseData = this.courses[courseID]
        // courseData.difficultyRating = difficultyRating / reviews.length
        // courseData.qualityRating = qualityRating / reviews.length
    }

    voteUpReview(reviewID){
        return this._withMongoDB()
            .then((database) => {
                let db = database.db("csc301")
                console.log(reviewID)
                return db.collection("reviews").updateOne({"reviewID": reviewID} ,
            {$inc: {"likes": 1}})
            })
    }

    voteDownReview(reviewID){
        return this._withMongoDB()
            .then((database) => {
                let db = database.db("csc301")
                console.log(reviewID)
                return db.collection("reviews").updateOne({"reviewID": reviewID} ,
            {$inc: {"dislikes": 1}})
            })
    }



}

module.exports = MongoDBDataModel
